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

