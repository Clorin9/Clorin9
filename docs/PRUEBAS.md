# Registro de pruebas

Fecha de ejecución: 21 de octubre de 2026.

## Automatizadas

El comando `npm run test` ejecuta:

- build de producción de Vite;
- generación del paquete compatible con el worker recuperado;
- validación de archivos de salida;
- fallback de navegación y rechazo de rutas API inexistentes;
- análisis de GeoJSON válido e inválido;
- cálculo de evaluación;
- escape de exportación CSV.

## Controles manuales previstos

- navegación pública e interna;
- creación, edición y eliminación de parques/proyectos;
- persistencia tras recargar;
- importación GeoJSON y manejo de error;
- exportación CSV y JSON;
- impresión a PDF;
- vista responsive en 360 px, tableta y escritorio;
- acceso público después del despliegue.

Los resultados ejecutados se actualizan al cierre de cada publicación. No se declara aprobada una URL pública hasta comprobar la respuesta HTTP y la carga de recursos.

## Resultado ejecutado

- Build de producción: aprobado.
- Pruebas automatizadas: 8 aprobadas, 0 fallidas.
- Auditoría de dependencias: 0 vulnerabilidades conocidas reportadas por `npm audit`.
- Búsqueda local de patrones de secretos: sin credenciales detectadas; el permiso `id-token: write` del workflow es configuración esperada de GitHub Pages.
- QA visual original de Opción C: recuperado como evidencia histórica en `design-qa.md`.
- QA E2E de la v0.3: preparado en `scripts/browser-smoke.mjs`, no ejecutado en este entorno porque el navegador cloud no accede al servidor local y la descarga del binario Chromium fue bloqueada por la red del entorno.
- Publicación y acceso externo: pendientes hasta que exista el repositorio GitHub.

