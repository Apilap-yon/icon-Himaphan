/* ============================================================================
 *  ชั้นจัดเก็บข้อมูล (Storage layer)
 *  - ส่งไป Google Apps Script ถ้าตั้งค่า CONFIG.APPS_SCRIPT_URL ไว้
 *  - บันทึกสำเนาลง localStorage เสมอ เพื่อเป็น backup และให้หน้า admin ดูได้
 * ========================================================================== */

const LS_KEY = "mathweek2026_submissions";

function loadLocal() {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveLocal(list) {
  localStorage.setItem(LS_KEY, JSON.stringify(list));
}

function addLocal(record) {
  const list = loadLocal();
  list.push(record);
  saveLocal(list);
  return record;
}

/**
 * ส่งใบสมัคร
 * @param {Object} payload  ข้อมูลใบสมัคร (มี field "kind": "competition" | "volunteer")
 * @returns {Promise<{ok:boolean, offline:boolean, message?:string}>}
 */
async function submitRecord(payload) {
  const record = {
    ...payload,
    id: "REG-" + Date.now() + "-" + Math.random().toString(36).slice(2, 7),
    timestamp: new Date().toISOString(),
  };

  // สำเนาลงเครื่องเสมอ
  addLocal(record);

  // ถ้าไม่ได้ตั้งค่า endpoint -> โหมด localStorage อย่างเดียว
  if (!CONFIG.APPS_SCRIPT_URL) {
    return { ok: true, offline: true };
  }

  // ส่งไป Apps Script — ใช้ text/plain เพื่อเลี่ยง CORS preflight
  try {
    const res = await fetch(CONFIG.APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(record),
    });
    const data = await res.json().catch(() => ({ ok: res.ok }));
    if (data && data.ok === false) {
      return { ok: false, offline: false, message: data.message || "เซิร์ฟเวอร์ปฏิเสธคำขอ" };
    }
    return { ok: true, offline: false };
  } catch (err) {
    // ส่งไม่สำเร็จ แต่ยังมีสำเนาใน localStorage
    return { ok: true, offline: true, message: "บันทึกลงเครื่องชั่วคราว (เชื่อมต่อเซิร์ฟเวอร์ไม่ได้)" };
  }
}

/* ดึงจำนวนที่สมัครแล้วจากสำเนาในเครื่อง (ใช้ประเมินที่นั่งคงเหลือแบบคร่าว ๆ) */
function localCounts() {
  const counts = {};
  loadLocal().forEach((r) => {
    if (r.kind === "competition" && r.competitionId) {
      counts[r.competitionId] = (counts[r.competitionId] || 0) + 1;
    }
    if (r.kind === "volunteer" && Array.isArray(r.tasks)) {
      r.tasks.forEach((t) => {
        const key = "vol:" + t;
        counts[key] = (counts[key] || 0) + 1;
      });
    }
  });
  return counts;
}
