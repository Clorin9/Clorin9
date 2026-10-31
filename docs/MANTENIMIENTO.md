# Actualización y mantenimiento

## Flujo normal

1. Crear una rama desde `main`.
2. Ejecutar `npm ci`.
3. Aplicar cambios y actualizar documentación.
4. Ejecutar `npm run test` y `npm audit`.
5. Revisar que no existan secretos ni documentos privados.
6. Abrir revisión y fusionar a `main`.
7. Verificar el workflow y la URL pública.

## Datos históricos

No editar silenciosamente `src/data.js`. Cada actualización debe registrar fuente, fecha de corte, responsable y método de conciliación. Los campos sin evidencia deben permanecer como pendientes o no publicados.

## Dependencias

Revisar mensualmente alertas de seguridad y actualizaciones compatibles. No usar `npm audit fix --force` sin revisar cambios mayores.

## Migración al modo operativo

Antes de incorporar datos privados, retirar la edición local del frontend público y conectar una API autenticada. Migrar el esquema de datos con pruebas, control de versiones y respaldo verificable.

