# Ubicaciones GIS

Revisión cartográfica: 31 de octubre de 2026.

La versión anterior ubicaba los marcadores mediante porcentajes CSS (`left`/`top`) sobre una imagen que se recortaba con `object-fit: cover`. Ese mecanismo no era georreferenciado y desplazaba los parques según el tamaño de pantalla. La versión corregida usa coordenadas WGS84 (EPSG:4326) sobre OpenStreetMap mediante Leaflet.

| Parque | Latitud | Longitud | Calidad | Referencia |
|---|---:|---:|---|---|
| Mcal. Francisco Solano López | -25.4050599 | -57.4577762 | Verificada | MIC: Ruta 1 km 21 y 25°24'18.3"S 57°27'28.5"W; punto cartográfico del parque |
| TOSA | -25.1965222 | -57.5701082 | Verificada | MIC: ubicación georreferenciada Costa Oriental Paraguay S.A.; predio Ruta 12 km 3,5 |
| ALGESA | -25.4910375 | -54.7224219 | Verificada | MIC: PY02 km 12,3; punto cartográfico de la terminal ALGESA |
| Iruña / Parque Industrial KM 11 | -25.4947999 | -54.7082324 | Verificada | MIC: Ruta PY02/PY07 km 11; punto cartográfico Parque Industrial KM 11 |
| Santa Mónica | -25.2911658 | -54.6987244 | Verificada | MIC: Supercarretera Itaipú km 35, Campo Tacurú; punto cartográfico del parque |
| Pradera Alta | -27.0749467 | -55.6361324 | Referencia de acceso | MIC: Camino al Puerto de Hohenau; punto público Pradera Alta. No representa polígono catastral |
| Megalog | -25.2225618 | -57.5010772 | Verificada | MIC: Calle América, Luque; punto cartográfico MEGALOG S.A. |
| Duotec | -25.154189869131148 | -57.4797176202349 | Oficial | Coordenadas publicadas expresamente por el MIC |
| PTI Taiwán–Paraguay | -25.4864371 | -54.8332813 | Verificada | MIC: Minga Guazú, km 22–24 de la PY02; punto cartográfico del parque |

Fuentes institucionales principales:

- https://www.mic.gov.py/parques-industriales-en-py/
- https://www.mic.gov.py/parque-industrial-mariscal-francisco-solano-lopez/
- https://www.mic.gov.py/terminal-occidental-s-a-tosa/
- https://www.mic.gov.py/iruna-emprendimientos-inmobiliarios-s-a/
- https://www.mic.gov.py/santa-monica-s-a/
- https://www.mic.gov.py/pradera-alta/
- https://www.mic.gov.py/parque-industrial-megalog-s-a/
- https://www.mic.gov.py/duotec-s-a/

Limitación: los marcadores representan puntos de ubicación o acceso. No sustituyen mensura, polígono catastral, deslinde ni levantamiento de precisión. Los polígonos deberán incorporarse como GeoJSON WGS84 o desde PostGIS cuando exista cartografía oficial validada.
