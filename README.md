# Pipo Perico Reportes

Control de rentabilidad de Pipo Perico Hot Sauce (Conmigo Brands LLC), con clave.
Live: https://jesusmlpd.github.io/pipo-perico-reportes/

Una sola página (`index.html`). No contiene números: los pide a un Apps Script que lee
el archivo de control en Google Drive (el `.xlsm`) y solo responde con la clave correcta.
El archivo de Drive puede quedar **Restringido**. Push a `main` = deploy (GitHub Pages).

## En vivo

- Cualquier cambio al archivo en Drive aparece en la página en máximo 2 minutos
  (o al dar "Actualizar"). El script compara la fecha de modificación y solo relee si cambió.
- Muestra todas las pestañas visibles. Meses, filas o pestañas nuevas aparecen solas.
- Si se sube una versión nueva del Excel, usar "Gestionar versiones" o reemplazar el
  archivo existente para que el ID no cambie. Si cambia, actualizar `FILE_ID` en el script.

## Conectar (una vez)

1. Entra a https://script.google.com con la cuenta que tiene el archivo > **Nuevo proyecto**.
   Nómbralo "Pipo Perico Reportes".
2. Borra el contenido y pega `apps-script.gs`. Guarda.
3. A la izquierda, **Servicios (+) > Drive API** > Agregar (deja la versión v3).
4. **Configuración del proyecto (engrane) > Propiedades de la secuencia de comandos** >
   agrega `PASSWORD` con la clave que darás al cliente.
5. Arriba elige la función `prueba` > **Ejecutar**. Autoriza (Google dirá "app no verificada":
   Avanzado > Ir a Pipo Perico Reportes). En el registro deben salir las 5 pestañas.
6. **Implementar > Nueva implementación** > tipo **Aplicación web**:
   Ejecutar como **Yo**, Quién tiene acceso **Cualquier persona**. Copia la URL `/exec`.
7. Prueba: `https://jesusmlpd.github.io/pipo-perico-reportes/?api=<URL>` y entra con la clave.
8. Pega la URL en `CONFIG.API_URL` de `index.html` y haz push.

Si cambias el código del script: Implementar > Gestionar implementaciones > editar >
Versión nueva (la URL no cambia). Para cambiar la clave basta editar `PASSWORD`.
