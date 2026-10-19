# Pipo Perico Reportes

Reporte público de anuncios de Pipo Perico Hot Sauce (Conmigo Brands LLC).
Live: https://jesusmlpd.github.io/pipo-perico-reportes/

Una sola página (`index.html`) que lee un Google Sheet en vivo cada vez que se abre
(y cada 5 minutos). Push a `main` = deploy (GitHub Pages).

## Conectar el Google Sheet

1. Crea un Google Sheet con dos pestañas llamadas exactamente **Semanas** y **Anuncios**.
   Puedes importar `plantillas/Semanas.csv` y `plantillas/Anuncios.csv`
   (Archivo > Importar > Subir > "Insertar hojas nuevas").
2. Columnas (fila 1). Los nombres no distinguen mayúsculas ni acentos:
   - Semanas: `Semana | Inversion | Ventas | Ingresos | Impresiones | Clics`
   - Anuncios: `Anuncio | Inversion | Ventas | Ingresos | Impresiones | Clics`
   Números sin texto extra (se aceptan `$`, comas y `%`).
3. Compartir > Acceso general > **Cualquier persona con el enlace: Lector**.
4. Copia el ID de la URL: `docs.google.com/spreadsheets/d/<ID>/edit`.
5. Pégalo en `index.html`, en `CONFIG.SHEET_ID`, y haz push.
   Para probar antes de publicar: abre la página con `?sheet=<ID>`.

La página calcula sola: costo por venta, ROAS, CTR, total y avance a la meta
(`CONFIG.GOAL_SALES`, 100 ventas).

Ojo: la página es pública y el Sheet queda legible para quien tenga el ID.
No pongas datos privados (clientes, emails, retainer) en ese Sheet.
