# Inventario de módulos y pendientes

| Módulo | Estado v0.3 | Persistencia | Pendiente operativo |
|---|---|---|---|
| Dashboard | Implementado | Calculado en navegador | Conectar indicadores oficiales versionados |
| Parques | Consulta, filtros y CRUD local | localStorage | API, roles, validación institucional y coordenadas oficiales |
| Proyectos | CRUD, hitos, etapas, inversión y avance | localStorage | Flujo de aprobación, responsables y cronograma detallado |
| GIS | Marcadores, GeoJSON y polígonos | Sesión del navegador | MapLibre/Leaflet, PostGIS, CRS y capas oficiales |
| Documentos | Metadatos, estado y versión | localStorage | Repositorio privado, antivirus, firma y control de acceso |
| Evaluación | Matriz editable y cálculo | localStorage | Parámetros normativos fuenteados, evidencias y aprobación |
| Reportes | CSV e impresión/PDF | Descarga local | Plantillas institucionales y generación en servidor |
| Administración | Respaldo/restauración local | localStorage/JSON | Usuarios, roles, permisos, catálogos y auditoría real |

## Limitaciones explícitas

- Sin backend, base de datos ni colaboración multiusuario.
- Sin autenticación ni control de acceso efectivo.
- Sin publicación de expedientes privados.
- Sin garantía de vigencia de los registros históricos.
- Sin polígonos oficiales ni validación catastral.
- Sin medición geodésica; la visualización GeoJSON es orientativa.

