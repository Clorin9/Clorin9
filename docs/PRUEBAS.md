# Registro de pruebas

Fecha de ejecución: 5 de noviembre de 2026.

## Automatizadas

El comando `npm run test` ejecuta:

- build de producción de Vite;
- generación del paquete compatible con el worker recuperado;
- validación de archivos de salida;
- fallback de navegación y rechazo de rutas API inexistentes;
- análisis de GeoJSON válido e inválido;
- cálculo de evaluación;
- escape de exportación CSV.
- lectura de CSV con valores entrecomillados;
- lectura de la primera hoja XLSX;
- validación de filas, duplicados, superficie y coordenadas;
- auditoría de completitud y trazabilidad.

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
- Pruebas automatizadas: 13 aprobadas, 0 fallidas.
- Auditoría de dependencias: 0 vulnerabilidades conocidas reportadas por `npm audit`.
- Búsqueda local de patrones de secretos: sin credenciales detectadas; el permiso `id-token: write` del workflow es configuración esperada de GitHub Pages.
- QA visual de la v0.4: aprobado contra la opción 3 y el componente `Oportunidades territoriales` de la opción 2; evidencia y correcciones en `design-qa.md`.
- QA visual de la v0.5: aprobados en navegador cloud el módulo de calidad, la ficha integral, la separación público/interno y el registro de capas GIS. La selección automatizada de archivos locales quedó cubierta por pruebas unitarias porque el navegador cloud no monta rutas del workspace.
- QA visual de la v0.6: aprobados en navegador cloud el centro de comando, los dos visuales 3D, la columna territorial, el radar lateral y la respuesta activa del agente SIGPI IA a una comparación por superficie.
- Prueba Playwright local: no ejecutada por ausencia del binario Chromium en el entorno; no se declara aprobada. Fue sustituida por QA del build servido en el navegador cloud.
- QA en navegador cloud: navegación, filtros, mapa/lista, radar/oportunidades y exportación CSV aprobados. El mapa se corrigió tras detectar bloqueo 403 de OpenStreetMap; la capa final usa Esri.
- QA móvil automatizada: pendiente porque la descarga del binario Chromium local fue bloqueada por la red del entorno; los breakpoints responsive sí están implementados.
- Repositorio público: verificado en `Clorin9/Clorin9`, rama `main`.
- GitHub Actions: instalación, build y 8 pruebas aprobadas; el paso `configure-pages` falló porque GitHub Pages no estaba habilitado administrativamente.
- Publicación alternativa: versión 1 desplegada correctamente mediante Sites.
- Acceso público: `https://sigpi-paraguay-2026.condeclo.chatgpt.site`, estado activo y audiencia pública verificados por el servicio de alojamiento.

