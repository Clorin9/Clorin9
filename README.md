# SIGPI Paraguay

Sistema Integral de Gestión de Parques Industriales del Paraguay. Versión web funcional recuperada desde el prototipo **SIGPI Opción C v0.1** y ampliada como **v0.3**.

## Estado

- Frontend estático React + Vite.
- Publicable en GitHub Pages.
- Datos históricos con corte declarado en julio de 2025.
- Proyectos, matrices y documentos de ejemplo identificados como demostrativos.
- Persistencia local en `localStorage`; no existe persistencia multiusuario.
- Sin autenticación real ni almacenamiento de expedientes privados.

## Módulos funcionales

1. Dashboard: indicadores calculados y distribución territorial.
2. Parques: consulta, filtros y CRUD local en modo interno.
3. Proyectos: cartera demostrativa, hitos, avance e inversión.
4. Mapa GIS: marcadores, selección e importación validada de GeoJSON; renderiza polígonos WGS84 con proyección simplificada.
5. Documentos: metadatos, clasificación, estado y versión; no carga archivos binarios.
6. Evaluación: matriz configurable por parque y cálculo de cumplimiento demostrativo.
7. Reportes: exportación CSV e impresión/guardado como PDF mediante el navegador.
8. Administración: respaldo JSON, restauración y arquitectura prevista de roles/catálogos.

## Instalación

Requiere Node.js 22 y npm.

```bash
npm ci
npm run dev
```

## Verificación

```bash
npm run test
```

El comando compila la aplicación y ejecuta las pruebas unitarias y de empaquetado.

## Build de producción

```bash
npm run build
npm run preview
```

El frontend se genera en `dist/client`. En GitHub Actions, Vite utiliza la ruta base `/sigpi-paraguay/`.

## Publicación

El workflow `.github/workflows/deploy-pages.yml` compila, prueba y publica `dist/client` en GitHub Pages al actualizar `main`. En la configuración del repositorio, Pages debe usar **GitHub Actions** como fuente.

La primera publicación se realiza desde el repositorio público contenedor `Clorin9/Clorin9`, porque el conector autorizado permite escribir en repositorios existentes pero no crear uno nuevo. El código está preparado para migrarse posteriormente a `Clorin9/sigpi-paraguay` cambiando `VITE_BASE_PATH` a `/sigpi-paraguay/`.

- Repositorio público: https://github.com/Clorin9/Clorin9
- Aplicación pública: https://sigpi-paraguay-2026.condeclo.chatgpt.site
- Estado: versión 1 desplegada con acceso público.

La ejecución de GitHub Actions aprobó instalación, build y pruebas. GitHub Pages no pudo activarse automáticamente porque esa configuración administrativa no está disponible para el conector; por ello, la versión pública se sirve mediante Sites con la misma compilación verificada.

## Protección de datos

No introducir datos personales, expedientes administrativos, documentos de clientes, credenciales ni secretos. GitHub Pages es público y no ofrece backend ni control de acceso. Para operación institucional se requiere el backend descrito en [Arquitectura](docs/ARQUITECTURA.md).

## Documentación

- [Arquitectura](docs/ARQUITECTURA.md)
- [Módulos y pendientes](docs/MODULOS_Y_PENDIENTES.md)
- [Recuperación y diferencias](docs/RECUPERACION_Y_DIFERENCIAS.md)
- [Pruebas](docs/PRUEBAS.md)
- [Ubicaciones GIS](docs/UBICACIONES_GIS.md)
- [Mantenimiento](docs/MANTENIMIENTO.md)
- [Seguridad](SECURITY.md)

