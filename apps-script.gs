/**
 * Pipo Perico Reportes: puente entre el archivo de control en Drive (privado) y la página.
 *
 * Lee el .xlsm tal cual está en Drive cada vez que cambia, lo convierte a una copia
 * temporal para leerlo, la borra, y entrega todas las pestañas visibles en JSON.
 * Solo responde si la clave (propiedad PASSWORD) es correcta.
 *
 * Requiere: Servicios > Drive API (v3) activado. Ver README.md.
 */
const FILE_ID = "1XD359gQfWLieTe1LRR6GeD0Fopikcwx0";

function doGet(e) {
  const pass = PropertiesService.getScriptProperties().getProperty("PASSWORD");
  if (!pass || (e.parameter.k || "") !== pass) return json({ error: "unauthorized" });

  try {
    const file = DriveApp.getFileById(FILE_ID);
    const updated = file.getLastUpdated().toISOString();
    const cache = CacheService.getScriptCache();
    const hit = cache.get("data");
    if (hit) {
      const d = JSON.parse(hit);
      if (d.updated === updated) return json(d); // el archivo no cambió
    }
    const d = { name: file.getName(), updated: updated, sheets: readWorkbook(file) };
    cache.put("data", JSON.stringify(d), 21600);
    return json(d);
  } catch (err) {
    return json({ error: String(err.message || err) });
  }
}

/* Lee todas las pestañas visibles. Si es Excel, usa una copia temporal en Google Sheets. */
function readWorkbook(file) {
  let id = file.getId(), tmp = null;
  if (file.getMimeType() !== MimeType.GOOGLE_SHEETS) {
    tmp = Drive.Files.create({ name: "_pipo_reporte_tmp", mimeType: MimeType.GOOGLE_SHEETS }, file.getBlob());
    id = tmp.id;
  }
  try {
    return SpreadsheetApp.openById(id).getSheets()
      .filter(function (s) { return !s.isSheetHidden(); })
      .map(function (s) { return { name: s.getName(), rows: trim(s.getDataRange().getValues()) }; });
  } finally {
    if (tmp) Drive.Files.remove(tmp.id);
  }
}

/* Quita filas y columnas vacías al final y redondea centavos */
function trim(rows) {
  const empty = function (v) { return v === "" || v === null; };
  rows = rows.map(function (r) {
    return r.map(function (v) {
      if (typeof v === "number") return Math.round(v * 100) / 100;
      if (v instanceof Date) return Utilities.formatDate(v, "America/Mexico_City", "yyyy-MM-dd");
      return v;
    });
  });
  while (rows.length && rows[rows.length - 1].every(empty)) rows.pop();
  let w = 0;
  rows.forEach(function (r) { for (let i = r.length - 1; i >= 0; i--) if (!empty(r[i])) { w = Math.max(w, i + 1); break; } });
  return rows.map(function (r) { return r.slice(0, w); });
}

/* Para probar desde el editor: ejecuta esta función y revisa el registro */
function prueba() {
  const d = readWorkbook(DriveApp.getFileById(FILE_ID));
  Logger.log(d.map(function (s) { return s.name + ": " + s.rows.length + " filas"; }).join("\n"));
}

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
