# Seguridad

## Alcance de esta versión

La aplicación publicada es un frontend estático. No ofrece autenticación real, autorización, cifrado de expedientes ni persistencia central. No debe utilizarse para datos confidenciales.

## Reporte

No publique vulnerabilidades ni secretos en issues públicos. Utilice el canal privado de seguridad configurado por el propietario del repositorio.

## Controles aplicados

- ausencia de credenciales en el código;
- validación y límites básicos para formularios y GeoJSON;
- sin renderizado de HTML importado;
- dependencias reducidas y auditadas;
- separación explícita entre datos históricos, calculados, ficticios y pendientes;
- GitHub Actions con permisos mínimos para Pages.

