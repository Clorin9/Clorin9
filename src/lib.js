import { strFromU8, unzipSync } from "fflate";

export const APP_STORAGE_VERSION = 1;

export function loadLocal(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed?.version === APP_STORAGE_VERSION ? parsed.value : fallback;
  } catch {
    return fallback;
  }
}

export function saveLocal(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify({ version: APP_STORAGE_VERSION, value }));
    return true;
  } catch {
    return false;
  }
}

export function safeId(prefix, value = "") {
  const normalized = value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 42);
  return `${prefix}-${normalized || Date.now().toString(36)}`;
}

export function formatNumber(value, options = {}) {
  return new Intl.NumberFormat("es-PY", options).format(Number(value) || 0);
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("es-PY", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(value) || 0);
}

export function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

export function toCsv(rows, columns) {
  const header = columns.map(([label]) => csvEscape(label)).join(",");
  const body = rows.map((row) => columns.map(([, key]) => csvEscape(row[key])).join(",")).join("\n");
  return `\uFEFF${header}\n${body}`;
}

export function downloadText(filename, text, type = "text/plain;charset=utf-8") {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function parseGeoJson(text) {
  const data = JSON.parse(text);
  if (!data || !["FeatureCollection", "Feature", "Polygon", "MultiPolygon", "Point", "MultiPoint", "LineString", "MultiLineString"].includes(data.type)) {
    throw new Error("El archivo no contiene un objeto GeoJSON reconocido.");
  }
  const features = data.type === "FeatureCollection" ? data.features : data.type === "Feature" ? [data] : [{ type: "Feature", properties: {}, geometry: data }];
  if (!Array.isArray(features) || features.length > 5000) throw new Error("El GeoJSON supera el límite de 5.000 entidades o no contiene una colección válida.");
  const types = [...new Set(features.map((feature) => feature?.geometry?.type).filter(Boolean))];
  return { data, featureCount: features.length, geometryTypes: types };
}

export function summarizeEvaluations(evaluations) {
  const values = Object.values(evaluations || {});
  const total = values.length;
  const complete = values.filter((value) => value === "Cumple").length;
  return { total, complete, score: total ? Math.round((complete / total) * 100) : 0 };
}

const blankMarkers = ["", "no publicado", "no disponible", "sin definir", "pendiente", "dato desactualizado", "actualización pendiente", "no conciliado en la fuente"];

export function isMeaningfulValue(value) {
  if (value === null || value === undefined) return false;
  if (typeof value === "number") return Number.isFinite(value);
  return !blankMarkers.includes(String(value).trim().toLowerCase());
}

export function auditParkData(parks) {
  const required = ["name", "short", "department", "city", "character", "surface", "resolution", "administrator", "activity", "status", "coordinates"];
  const optional = ["companies", "occupied", "available"];
  const seenNames = new Map();
  const seenResolutions = new Map();

  const records = parks.map((park) => {
    const missing = [];
    const stale = [];
    const coordinatesValid = Number.isFinite(Number(park.coordinates?.lat)) && Number.isFinite(Number(park.coordinates?.lon)) && Math.abs(Number(park.coordinates?.lat)) <= 90 && Math.abs(Number(park.coordinates?.lon)) <= 180;
    for (const field of required) {
      if (field === "coordinates" ? !coordinatesValid : !isMeaningfulValue(park[field])) missing.push(field);
    }
    for (const field of optional) if (!isMeaningfulValue(park[field])) missing.push(field);
    for (const field of ["occupied", "available", "sourceState"]) if (/desactualizado|pendiente|revisión/i.test(String(park[field] || ""))) stale.push(field);

    const nameKey = String(park.name || "").trim().toLowerCase();
    const resolutionKey = String(park.resolution || "").trim().toLowerCase();
    if (nameKey) seenNames.set(nameKey, [...(seenNames.get(nameKey) || []), park.id]);
    if (resolutionKey && resolutionKey !== "pendiente") seenResolutions.set(resolutionKey, [...(seenResolutions.get(resolutionKey) || []), park.id]);

    const availableFields = required.length + optional.length;
    const score = Math.max(0, Math.round(((availableFields - missing.length) / availableFields) * 100));
    const traceable = Boolean(park.sourceState && park.coordinates?.source);
    return { id: park.id, short: park.short, score, missing, stale, coordinatesValid, traceable, level: score >= 85 && traceable ? "Alta" : score >= 65 ? "Media" : "Baja" };
  });

  const duplicateIds = new Set([
    ...[...seenNames.values()].filter((ids) => ids.length > 1).flat(),
    ...[...seenResolutions.values()].filter((ids) => ids.length > 1).flat(),
  ]);
  const enriched = records.map((record) => ({ ...record, duplicate: duplicateIds.has(record.id) }));
  const average = enriched.length ? Math.round(enriched.reduce((sum, record) => sum + record.score, 0) / enriched.length) : 0;
  return {
    records: enriched,
    summary: {
      total: enriched.length,
      average,
      high: enriched.filter((record) => record.level === "Alta").length,
      medium: enriched.filter((record) => record.level === "Media").length,
      low: enriched.filter((record) => record.level === "Baja").length,
      invalidCoordinates: enriched.filter((record) => !record.coordinatesValid).length,
      duplicates: enriched.filter((record) => record.duplicate).length,
      stale: enriched.filter((record) => record.stale.length).length,
    },
  };
}

export function parseCsv(text) {
  const rows = [];
  let row = []; let cell = ""; let quoted = false;
  const source = String(text || "").replace(/^\uFEFF/, "");
  const firstLine = source.split(/\r?\n/, 1)[0] || "";
  const delimiter = (firstLine.match(/;/g)?.length || 0) > (firstLine.match(/,/g)?.length || 0) ? ";" : ",";
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (char === '"' && quoted && source[index + 1] === '"') { cell += '"'; index += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === delimiter && !quoted) { row.push(cell.trim()); cell = ""; }
    else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && source[index + 1] === "\n") index += 1;
      row.push(cell.trim()); if (row.some((value) => value !== "")) rows.push(row); row = []; cell = "";
    } else cell += char;
  }
  row.push(cell.trim()); if (row.some((value) => value !== "")) rows.push(row);
  if (rows.length < 2) return [];
  const headers = rows[0].map((value) => String(value).trim());
  return rows.slice(1).map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])));
}

function xmlDecode(value) {
  return String(value || "").replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", '"').replaceAll("&#39;", "'");
}

function columnIndex(reference) {
  return [...reference].reduce((value, letter) => (value * 26) + letter.charCodeAt(0) - 64, 0) - 1;
}

export function parseXlsxArrayBuffer(buffer) {
  const files = unzipSync(new Uint8Array(buffer), { filter: (file) => (/^xl\/(sharedStrings\.xml|worksheets\/sheet\d+\.xml)$/.test(file.name) && file.originalSize <= 10_000_000) });
  const sharedXml = files["xl/sharedStrings.xml"] ? strFromU8(files["xl/sharedStrings.xml"]) : "";
  const shared = [...sharedXml.matchAll(/<si[^>]*>([\s\S]*?)<\/si>/g)].map((match) => xmlDecode([...match[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((item) => item[1]).join("")));
  const sheetName = Object.keys(files).filter((name) => /^xl\/worksheets\/sheet\d+\.xml$/.test(name)).sort()[0];
  if (!sheetName) throw new Error("El archivo XLSX no contiene una hoja reconocible.");
  const sheetXml = strFromU8(files[sheetName]);
  const matrix = [];
  for (const rowMatch of sheetXml.matchAll(/<row[^>]*r="(\d+)"[^>]*>([\s\S]*?)<\/row>/g)) {
    const rowIndex = Number(rowMatch[1]) - 1; const row = [];
    for (const cellMatch of rowMatch[2].matchAll(/<c([^>]*)>([\s\S]*?)<\/c>/g)) {
      const attributes = cellMatch[1]; const reference = attributes.match(/\br="([A-Z]+)\d+"/)?.[1];
      if (!reference) continue;
      const index = columnIndex(reference); const body = cellMatch[2];
      const raw = body.match(/<v[^>]*>([\s\S]*?)<\/v>/)?.[1] ?? body.match(/<t[^>]*>([\s\S]*?)<\/t>/)?.[1] ?? "";
      row[index] = /t="s"/.test(attributes) ? shared[Number(raw)] ?? "" : xmlDecode(raw);
    }
    matrix[rowIndex] = row;
  }
  const populated = matrix.filter((row) => Array.isArray(row) && row.some((value) => value !== undefined && value !== ""));
  if (populated.length < 2) return [];
  const headers = populated[0].map((value) => String(value || "").trim());
  return populated.slice(1).map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])));
}

const importAliases = {
  name: ["nombre", "parque", "nombre del parque"], short: ["nombre corto", "sigla", "corto"],
  department: ["departamento", "dpto"], city: ["distrito", "ciudad", "municipio"], character: ["carácter", "caracter", "tipo"],
  surface: ["superficie", "superficie ha", "hectáreas", "hectareas"], resolution: ["resolución", "resolucion"],
  companies: ["empresas", "empresas instaladas"], administrator: ["administrador", "administración", "administracion"],
  activity: ["actividad", "sectores"], status: ["estado"], latitude: ["latitud", "latitude", "lat"], longitude: ["longitud", "longitude", "lon", "lng"],
};

function normalizedHeader(value) { return String(value || "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); }

export function validateParkImportRows(rows, existingParks = [], sourceName = "Archivo importado") {
  const existingNames = new Set(existingParks.map((park) => normalizedHeader(park.name)));
  const existingResolutions = new Set(existingParks.map((park) => normalizedHeader(park.resolution)).filter((value) => value && value !== "pendiente"));
  const accepted = []; const rejected = [];
  rows.forEach((input, rowIndex) => {
    const normalized = Object.fromEntries(Object.entries(input).map(([key, value]) => [normalizedHeader(key), value]));
    const valueFor = (field) => {
      const names = [field, ...(importAliases[field] || [])].map(normalizedHeader);
      return names.map((name) => normalized[name]).find((value) => value !== undefined && value !== "") ?? "";
    };
    const name = String(valueFor("name")).trim(); const department = String(valueFor("department")).trim(); const city = String(valueFor("city")).trim();
    const resolution = String(valueFor("resolution") || "Pendiente").trim(); const surface = Number(String(valueFor("surface")).replace(",", "."));
    const latitudeRaw = valueFor("latitude"); const longitudeRaw = valueFor("longitude"); const latitude = latitudeRaw === "" ? null : Number(String(latitudeRaw).replace(",", ".")); const longitude = longitudeRaw === "" ? null : Number(String(longitudeRaw).replace(",", "."));
    const errors = [];
    if (!name) errors.push("Nombre faltante"); if (!department) errors.push("Departamento faltante"); if (!city) errors.push("Distrito faltante");
    if (!Number.isFinite(surface) || surface <= 0) errors.push("Superficie inválida");
    if ((latitude === null) !== (longitude === null)) errors.push("Latitud y longitud deben informarse juntas");
    if (latitude !== null && (!Number.isFinite(latitude) || Math.abs(latitude) > 90 || !Number.isFinite(longitude) || Math.abs(longitude) > 180)) errors.push("Coordenadas inválidas");
    if (existingNames.has(normalizedHeader(name))) errors.push("El parque ya existe por nombre");
    if (resolution !== "Pendiente" && existingResolutions.has(normalizedHeader(resolution))) errors.push("La resolución ya existe");
    if (accepted.some((park) => normalizedHeader(park.name) === normalizedHeader(name))) errors.push("Nombre duplicado dentro del archivo");
    if (errors.length) { rejected.push({ row: rowIndex + 2, name: name || "Sin nombre", errors }); return; }
    accepted.push({
      id: safeId("park", name), name, short: String(valueFor("short") || name).trim().slice(0, 40), department, city,
      character: String(valueFor("character") || "Privado").trim(), surface, resolution,
      companies: Number(valueFor("companies")) || 0, administrator: String(valueFor("administrator") || "No publicado").trim(),
      activity: String(valueFor("activity") || "No publicado").trim(), occupied: "No publicado", available: "No publicado",
      status: String(valueFor("status") || "En análisis").trim(), sourceState: "Importado · pendiente de revisión", custom: true,
      coordinates: latitude === null ? null : { lat: latitude, lon: longitude, quality: "Importada sin validar", source: sourceName },
    });
  });
  return { accepted, rejected, total: rows.length };
}

