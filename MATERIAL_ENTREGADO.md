# SIGPI Paraguay — versión funcional v0.3

## Alcance de esta entrega

Esta versión implementa el núcleo navegable de registro institucional e inteligencia territorial:

- dashboard con indicadores calculados;
- registro, filtros y CRUD local de parques;
- gestión demostrativa de proyectos e hitos;
- mapa nacional, importación GeoJSON y polígonos;
- metadatos documentales versionados;
- matriz de evaluación editable;
- exportaciones CSV, impresión/PDF y respaldo JSON;
- separación visual entre vista pública y gestión interna demostrativa;
- workflow de build, pruebas y despliegue en GitHub Pages;
- documentación de arquitectura, seguridad, pruebas y mantenimiento.

## Fuente institucional incorporada

La base histórica recuperada declara como fuente `Parques Industriales Autorizados MIC_JULIO 2025_JC.docx`. Esa fuente no está incluida en el repositorio público y los registros no se presentan como vigentes en 2026.

El prototipo diferencia:

- dato oficial declarado;
- cálculo derivado del documento;
- dato pendiente de verificación;
- dato temporal desactualizado;
- dato no publicado.

No se incorporaron como hechos datos simulados de inversión, empleo, ocupación, coordenadas o polígonos.

## Registros incluidos

1. Parque Industrial Mariscal Francisco Solano López.
2. Terminal Occidental S.A. (TOSA).
3. Almacenes Generales S.A. (ALGESA).
4. Iruña Emprendimientos Inmobiliarios S.A.
5. Santa Mónica S.A.
6. Pradera Alta.
7. Megalog S.A.
8. Duotec.
9. Parque Tecnológico Inteligente Taiwán–Paraguay.

## Controles realizados

- compilación de producción aprobada;
- empaquetado estático aprobado;
- 8 pruebas automatizadas aprobadas;
- auditoría de dependencias: 0 vulnerabilidades conocidas;
- revisión de patrones de secretos aprobada;
- comparación visual original documentada en `design-qa.md`.

## Límites de esta versión

- Las posiciones en el mapa son referencias por distrito, no coordenadas oficiales de los predios.
- Solamente Duotec presenta coordenadas expresas en la fuente.
- Los polígonos oficiales no están incorporados.
- Infraestructura territorial externa, inversiones, empleo e impacto permanecen pendientes hasta contar con fuentes verificables.
- No existe backend, autenticación, permisos efectivos ni persistencia multiusuario.
- Los cambios internos se guardan solamente en el navegador.
- La visualización GeoJSON usa una proyección simplificada y no sustituye análisis técnico.
