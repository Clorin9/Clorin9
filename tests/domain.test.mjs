import test from "node:test";
import assert from "node:assert/strict";
import { parseGeoJson, summarizeEvaluations, toCsv } from "../src/lib.js";

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
