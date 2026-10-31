# Ubicaciones GIS

Revisión cartográfica: 31 de octubre de 2026.

La versión anterior ubicaba los marcadores mediante porcentajes CSS (`left`/`top`) sobre una imagen que se recortaba con `object-fit: cover`. Ese mecanismo no era georreferenciado y desplazaba los parques según el tamaño de pantalla. La versión corregida usa coordenadas WGS84 (EPSG:4326) sobre OpenStreetMap mediante Leaflet.

| Parque | Latitud | Longitud | Calidad | Referencia |
|---|---:|---:|---|---|
| Mcal. Francisco Solano López | -25.4050833 | -57.4579167 | Enlace documental | Destino del vínculo georreferenciado de la ficha DGFI |
| TOSA | -25.1965222 | -57.5701082 | Enlace documental | Destino Costa Oriental Paraguay S.A. incluido en la ficha DGFI |
| ALGESA | -25.4910379 | -54.7224283 | Enlace documental | Destino ALGESA Terminal de Cargas km 12 incluido en la ficha DGFI |
| Iruña / Parque Industrial KM 11 | -25.4947898 | -54.7082325 | Enlace documental | Destino Parque Industrial KM 11 incluido en la ficha DGFI |
| Santa Mónica | -25.2911658 | -54.6987244 | Enlace documental | Destino Parque Industrial Santa Mónica incluido en la ficha DGFI |
| Pradera Alta | -27.1248165 | -55.5990332 | Enlace documental | Destino “Futuro Parque Industrial” incluido en la ficha DGFI |
| Megalog | -25.2225411 | -57.5010403 | Enlace documental | Destino MEGALOG S.A. incluido en la ficha DGFI |
| Duotec | -25.154189869131148 | -57.4797176202349 | Coordenada textual | Coordenada escrita expresamente en la ficha DGFI |
| PTI Taiwán–Paraguay | -25.4864371 | -54.8332813 | Enlace documental | Destino Parque Tecnológico Inteligente Taiwán Paraguay incluido en la ficha DGFI |

Fuente documental primaria:

- `Parques Industriales Autorizados MIC_DGFI_FEB 2026(1).docx`, archivo DGFI disponible en las fuentes documentales del proyecto.
- Contraste: `Parques Industriales Autorizados MIC_JULIO 2025_JC.docx`. Los nueve vínculos georreferenciados coinciden con la ficha de febrero de 2026.
- `GeoLISTA_index.html` no fue usado como fuente de coordenadas: su propio inventario indica que no contiene geometrías oficiales cargadas y conserva valores pendientes.

Limitación: los marcadores representan puntos de ubicación o acceso. No sustituyen mensura, polígono catastral, deslinde ni levantamiento de precisión. Los polígonos deberán incorporarse como GeoJSON WGS84 o desde PostGIS cuando exista cartografía oficial validada.
