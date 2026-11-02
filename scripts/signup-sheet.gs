// KidDash landing page: saves sign-ups (name + email) to this Google Sheet.
//
// Setup:
// 1. Create a Google Sheet, then open Extensions → Apps Script.
// 2. Replace the editor contents with this file and click Save.
// 3. Deploy → New deployment → type "Web app":
//      Execute as: Me
//      Who has access: Anyone
// 4. Authorize when asked, copy the Web app URL (ends in /exec),
//    and paste it into SIGNUP_ENDPOINT in src/config.js.
//
// After editing this script, use Deploy → Manage deployments → Edit → New version
// so the same URL picks up the change.

const SHEET_NAME = 'Signups'

function doPost(e) {
  const lock = LockService.getScriptLock()
  lock.waitLock(10000)
  try {
    const data = JSON.parse(e.postData.contents)
    const name = clean(data.name)
    const email = clean(data.email)
    if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return json({ ok: false, error: 'name and a valid email are required' })
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet()
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME)
    if (sheet.getLastRow() === 0) sheet.appendRow(['Timestamp', 'Name', 'Email', 'Source'])
    sheet.appendRow([new Date(), name, email, clean(data.source)])
    return json({ ok: true })
  } catch (err) {
    return json({ ok: false, error: String(err) })
  } finally {
    lock.releaseLock()
  }
}

// trim, cap length, and stop values like "=HYPERLINK(...)" from running as formulas
function clean(value) {
  const s = String(value || '').trim().slice(0, 200)
  return /^[=+\-@]/.test(s) ? "'" + s : s
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}
