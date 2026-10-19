# Pipo Perico Reportes

Reporte público de anuncios de Pipo Perico Hot Sauce (Conmigo Brands LLC).
Live: https://jesusmlpd.github.io/pipo-perico-reportes/

Una sola página (`index.html`) que lee un Google Sheet en vivo cada vez que se abre
(y cada 5 minutos). Push a `main` = deploy (GitHub Pages).

## Conectar el Google Sheet (se queda privado)

El Sheet NO se comparte. Un Apps Script dentro del Sheet entrega solo las pestañas
**Semanas** y **Anuncios** a la página. Nadie puede abrir el Sheet ni ver otras pestañas.

1. Crea el Sheet con dos pestañas llamadas exactamente **Semanas** y **Anuncios**.
   Puedes importar `plantillas/Semanas.csv` y `plantillas/Anuncios.csv`
   (Archivo > Importar > Subir > "Insertar hojas nuevas").
2. Columnas (fila 1), sin importar mayúsculas ni acentos:
   - Semanas: `Semana | Inversion | Ventas | Ingresos | Impresiones | Clics`
   - Anuncios: `Anuncio | Inversion | Ventas | Ingresos | Impresiones | Clics`
3. En el Sheet: **Extensiones > Apps Script**. Borra lo que haya y pega `apps-script.gs`. Guarda.
4. **Implementar > Nueva implementación** > tipo **Aplicación web**:
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
   Autoriza con tu cuenta (Google avisa "app no verificada": Avanzado > Ir al proyecto).
5. Copia la URL que termina en `/exec`.
6. Prueba: `https://jesusmlpd.github.io/pipo-perico-reportes/?api=<URL>`
7. Pega la URL en `CONFIG.API_URL` de `index.html` y haz push.

Si cambias el código del script: Implementar > Gestionar implementaciones > editar >
Versión nueva (así la URL no cambia).

La página calcula sola: costo por venta, ROAS, CTR, total y avance a la meta
(`CONFIG.GOAL_SALES`, 100 ventas).

Ojo: los números de Semanas y Anuncios sí quedan visibles en la página pública.
No metas datos privados en esas dos pestañas; todo lo demás del Sheet queda privado.
