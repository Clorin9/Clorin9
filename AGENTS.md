# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Durable product decisions

- Visual direction selected by the user: Option C, technology-led territorial intelligence.
- Dashboard v0.4 direction: option 3 `Centro de Comando Industrial` is the visual base. From option 2, incorporate only explicit components such as `Oportunidades territoriales`; do not merge the overall bright visual language.
- Institutional source of record for this prototype: `Parques Industriales Autorizados MIC_JULIO 2025_JC.docx`.
- The July 2025 document declares 9 parks approved and enabled by MIC resolution. Do not revert to the older public count of 8.
- Show official/declared, calculated, outdated, pending-verification, and unavailable data as visibly different states.
- Never fill unpublished coordinates, polygons, investment, employment, or occupancy fields with unlabeled mock values.
