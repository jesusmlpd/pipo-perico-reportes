/**
 * Pipo Perico Reportes: puente entre el Google Sheet (privado) y la página.
 * Pega este código en el Sheet: Extensiones > Apps Script.
 * Solo entrega las pestañas de TABS. El resto del Sheet nunca sale.
 */
const TABS = ["Semanas", "Anuncios"];

function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const out = {};
  TABS.forEach(function (name) {
    const sh = ss.getSheetByName(name);
    out[name] = sh ? sh.getDataRange().getDisplayValues() : [];
  });
  return ContentService.createTextOutput(JSON.stringify(out))
    .setMimeType(ContentService.MimeType.JSON);
}
