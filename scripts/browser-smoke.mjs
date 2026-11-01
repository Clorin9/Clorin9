import { createServer } from "node:http";
import { readFile, stat, mkdir } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const runtimeModules = process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES || "/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules";
const { chromium } = require(join(runtimeModules, "playwright"));
const root = new URL("../dist/client/", import.meta.url).pathname;
const artifacts = new URL("../artifacts/", import.meta.url).pathname;
const mime = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".svg": "image/svg+xml" };

const server = createServer(async (request, response) => {
  const raw = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
  const safe = normalize(raw).replace(/^(\.\.(\/|\\|$))+/, "");
  let file = join(root, safe === "/" ? "index.html" : safe);
  try { if ((await stat(file)).isDirectory()) file = join(file, "index.html"); }
  catch { file = join(root, "index.html"); }
  try { const body = await readFile(file); response.writeHead(200, { "content-type": mime[extname(file)] || "application/octet-stream" }); response.end(body); }
  catch { response.writeHead(404); response.end("Not found"); }
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const { port } = server.address();
await mkdir(artifacts, { recursive: true });
const browser = await chromium.launch({ headless: true });

try {
  const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await desktop.goto(`http://127.0.0.1:${port}`, { waitUntil: "networkidle" });
  await desktop.getByText("Parques industriales del Paraguay", { exact: true }).waitFor();
  await desktop.getByRole("button", { name: /Público/ }).click();
  await desktop.getByRole("button", { name: "Proyectos" }).click();
  await desktop.getByRole("button", { name: /Nuevo proyecto/ }).click();
  await desktop.getByLabel("Proyecto").fill("Proyecto de prueba automatizada");
  await desktop.getByLabel("Promotor").fill("QA local");
  await desktop.getByLabel("Sector").fill("Servicios");
  await desktop.getByLabel("Inversión proyectada (USD)").fill("1000000");
  await desktop.getByLabel("Próximo hito").fill("Verificación E2E");
  await desktop.getByRole("button", { name: "Guardar proyecto" }).click();
  await desktop.getByRole("heading", { name: "Proyecto de prueba automatizada" }).waitFor();
  await desktop.getByRole("button", { name: "Mapa GIS" }).click();
  await desktop.locator('input[type="file"][accept*="geojson"]').setInputFiles({
    name: "prueba.geojson", mimeType: "application/geo+json",
    buffer: Buffer.from(JSON.stringify({ type: "FeatureCollection", features: [{ type: "Feature", properties: {}, geometry: { type: "Polygon", coordinates: [[[-57.7, -25.2], [-57.4, -25.2], [-57.4, -25.5], [-57.7, -25.5], [-57.7, -25.2]]] } }] })),
  });
  await desktop.getByText("prueba.geojson").waitFor();
  await desktop.screenshot({ path: join(artifacts, "sigpi-desktop.png"), fullPage: true });

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 });
  await mobile.goto(`http://127.0.0.1:${port}`, { waitUntil: "networkidle" });
  await mobile.getByText("Parques industriales del Paraguay", { exact: true }).waitFor();
  await mobile.getByRole("button", { name: "Parques" }).click();
  await mobile.getByRole("heading", { name: "Inventario territorial" }).waitFor();
  await mobile.screenshot({ path: join(artifacts, "sigpi-mobile.png"), fullPage: true });
  console.log(JSON.stringify({ desktop: "passed", mobile: "passed", projectCrud: "passed", geojsonImport: "passed" }));
} finally {
  await browser.close();
  await new Promise((resolve) => server.close(resolve));
}
