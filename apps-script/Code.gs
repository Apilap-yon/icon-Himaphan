/* ============================================================================
 *  Math Week 2026 — Math Isekai · Google Apps Script backend
 *
 *  วิธีติดตั้ง
 *  ----------
 *  1) เปิด Google Sheet ที่จะใช้เก็บข้อมูลผู้สมัคร
 *  2) เมนู Extensions ▸ Apps Script  แล้วลบโค้ดเดิม วางไฟล์นี้ลงไปทั้งหมด
 *  3) กด Deploy ▸ New deployment ▸ ⚙️ เลือก "Web app"
 *        Execute as: Me
 *        Who has access: Anyone
 *  4) Authorize เมื่อระบบถาม แล้วคัดลอก Web app URL (ลงท้าย /exec)
 *  5) นำ URL ไปวางในไฟล์ js/config.js ที่ตัวแปร APPS_SCRIPT_URL
 *
 *  ระบบจะสร้างชีต 2 หน้าอัตโนมัติ: "Registrations" และ "Volunteers"
 * ========================================================================== */

var SHEET_COMP = 'Registrations';
var SHEET_VOL = 'Volunteers';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (data.kind === 'volunteer') {
      saveVolunteer(data);
    } else {
      saveCompetition(data);
    }
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, message: String(err) });
  }
}

function doGet() {
  // คืนค่าจำนวนผู้สมัครต่อรายการ (ใช้แสดงที่นั่งคงเหลือได้ในอนาคต)
  var counts = {};
  var sh = getSheet(SHEET_COMP);
  if (sh.getLastRow() > 1) {
    var values = sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues();
    var headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
    var idx = headers.indexOf('competitionId');
    values.forEach(function (row) {
      var id = row[idx];
      if (id) counts[id] = (counts[id] || 0) + 1;
    });
  }
  return json({ ok: true, counts: counts });
}

function saveCompetition(d) {
  var sh = getSheet(SHEET_COMP);
  ensureHeaders(sh, ['timestamp', 'id', 'competitionId', 'competitionName', 'type',
    'name', 'classroom', 'teamName', 'members', 'studentId', 'contact', 'advisor']);
  var members = '';
  if (d.members) {
    members = d.members.map(function (m) { return m.name + ' (' + m.classroom + ')'; }).join(' | ');
  }
  sh.appendRow([d.timestamp, d.id, d.competitionId, d.competitionName, d.type || '',
    d.name || '', d.classroom || '', d.teamName || '', members,
    d.studentId || '', d.contact || '', d.advisor || '']);
}

function saveVolunteer(d) {
  var sh = getSheet(SHEET_VOL);
  ensureHeaders(sh, ['timestamp', 'id', 'name', 'classroom', 'studentId',
    'contact', 'tasks', 'note']);
  var tasks = (d.tasksLabel || d.tasks || []).join(' | ');
  sh.appendRow([d.timestamp, d.id, d.name || '', d.classroom || '',
    d.studentId || '', d.contact || '', tasks, d.note || '']);
}

function getSheet(name) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  return sh;
}

function ensureHeaders(sh, headers) {
  if (sh.getLastRow() === 0) {
    sh.appendRow(headers);
    sh.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sh.setFrozenRows(1);
  }
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
