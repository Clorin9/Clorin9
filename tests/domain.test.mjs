import test from "node:test";
import assert from "node:assert/strict";
import { strToU8, zipSync } from "fflate";
import { auditParkData, parseCsv, parseGeoJson, parseXlsxArrayBuffer, summarizeEvaluations, toCsv, validateParkImportRows } from "../src/lib.js";

test("parseGeoJson accepts a valid feature collection", () => {
  const result = parseGeoJson(JSON.stringify({ type: "FeatureCollection", features: [{ type: "Feature", properties: {}, geometry: { type: "Point", coordinates: [-57.6, -25.3] } }] }));
  assert.equal(result.featureCount, 1);
  assert.deepEqual(result.geometryTypes, ["Point"]);
});

test("parseGeoJson rejects unsupported JSON", () => {
  assert.throws(() => parseGeoJson('{"type":"table"}'), /GeoJSON/);
});

test("evaluation score is deterministic", () => {
  assert.deepEqual(summarizeEvaluations({ a: "Cumple", b: "Pendiente", c: "Cumple" }), { total: 3, complete: 2, score: 67 });
});

test("CSV export escapes commas and quotes", () => {
  assert.match(toCsv([{ name: 'A, "B"' }], [["Nombre", "name"]]), /"A, ""B"""/);
});

test("CSV import preserves quoted commas and newlines", () => {
  const rows = parseCsv('Nombre,Departamento,Distrito,Superficie\n"Parque, Norte",Central,Luque,12.5\n');
  assert.equal(rows.length, 1);
  assert.equal(rows[0].Nombre, "Parque, Norte");
});

test("CSV import detects semicolon delimiter", () => {
  const rows = parseCsv("Nombre;Departamento;Distrito;Superficie\nParque Sur;Itapúa;Hohenau;20");
  assert.equal(rows[0].Departamento, "Itapúa");
  assert.equal(rows[0].Superficie, "20");
});

test("park import rejects duplicate and invalid rows", () => {
  const result = validateParkImportRows([
    { Nombre: "Existente", Departamento: "Central", Distrito: "Luque", Superficie: "10" },
    { Nombre: "Nuevo", Departamento: "Central", Distrito: "Limpio", Superficie: "8.5", Latitud: "-25.1", Longitud: "-57.5" },
    { Nombre: "Sin superficie", Departamento: "Central", Distrito: "Luque", Superficie: "0" },
  ], [{ id: "one", name: "Existente", resolution: "1/2025" }], "prueba.csv");
  assert.equal(result.accepted.length, 1);
  assert.equal(result.rejected.length, 2);
  assert.equal(result.accepted[0].sourceState, "Importado · pendiente de revisión");
});

test("data audit distinguishes completeness and traceability", () => {
  const audit = auditParkData([{ id: "p1", name: "Parque", short: "P", department: "Central", city: "Luque", character: "Privado", surface: 10, resolution: "1/2025", administrator: "Admin", activity: "Logística", status: "Habilitado", companies: 1, occupied: "5 ha", available: "5 ha", sourceState: "Histórico", coordinates: { lat: -25.2, lon: -57.5, source: "Ficha" } }]);
  assert.equal(audit.summary.average, 100);
  assert.equal(audit.records[0].level, "Alta");
  assert.equal(audit.summary.invalidCoordinates, 0);
});

test("XLSX import reads the first worksheet", () => {
  const shared = '<?xml version="1.0"?><sst><si><t>Nombre</t></si><si><t>Departamento</t></si><si><t>Distrito</t></si><si><t>Superficie</t></si><si><t>Parque XLSX</t></si><si><t>Central</t></si><si><t>Luque</t></si></sst>';
  const sheet = '<?xml version="1.0"?><worksheet><sheetData><row r="1"><c r="A1" t="s"><v>0</v></c><c r="B1" t="s"><v>1</v></c><c r="C1" t="s"><v>2</v></c><c r="D1" t="s"><v>3</v></c></row><row r="2"><c r="A2" t="s"><v>4</v></c><c r="B2" t="s"><v>5</v></c><c r="C2" t="s"><v>6</v></c><c r="D2"><v>12.5</v></c></row></sheetData></worksheet>';
  const archive = zipSync({ "xl/sharedStrings.xml": strToU8(shared), "xl/worksheets/sheet1.xml": strToU8(sheet) });
  const rows = parseXlsxArrayBuffer(archive.buffer.slice(archive.byteOffset, archive.byteOffset + archive.byteLength));
  assert.deepEqual(rows, [{ Nombre: "Parque XLSX", Departamento: "Central", Distrito: "Luque", Superficie: "12.5" }]);
});
