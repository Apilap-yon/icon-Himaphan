/* ============================================================================
 *  Math Week 2026 — Math Isekai · ตรรกะหน้าเว็บ (front-end logic)
 * ========================================================================== */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

document.addEventListener("DOMContentLoaded", () => {
  // ข้อมูลหัวเรื่อง
  $("#hero-subtitle").textContent = EVENT_INFO.subtitle;
  $("#contest-time").textContent = EVENT_INFO.contestTime;

  renderSchedule();
  renderCompetitions();
  renderGrand();
  renderVolunteerTasks();

  initModal();
  initRegisterForm();
  initVolunteerForm();
});

/* ---------- ตารางภาพรวมตามวัน ---------- */
function renderSchedule() {
  const list = $("#schedule-list");
  // เรียงตามวันที่
  const items = [...ALL_COMPETITIONS].sort((a, b) => a.isoDate.localeCompare(b.isoDate));
  // จัดกลุ่มตามวัน
  const byDay = {};
  items.forEach((c) => {
    const key = c.isoDate;
    (byDay[key] = byDay[key] || { day: c.day, dateLabel: c.dateLabel, items: [] }).items.push(c);
  });
  list.innerHTML = Object.values(byDay)
    .map(
      (g) => `
      <div class="sched-day">
        <div class="sched-day__head">
          <span class="sched-day__name">${g.day}</span>
          <span class="sched-day__date">${g.dateLabel}</span>
        </div>
        <ul class="sched-day__list">
          ${g.items
            .map(
              (c) => `<li><span class="sched-emoji">${c.creature}</span>
                ${c.name} <small>(${c.level})</small>
                <span class="sched-room">ห้อง ${c.room}</span></li>`
            )
            .join("")}
        </ul>
      </div>`
    )
    .join("");
}

/* ---------- การ์ดการแข่งขันรายบุคคล ---------- */
function renderCompetitions() {
  const grid = $("#competition-grid");
  grid.innerHTML = COMPETITIONS.map(cardHtml).join("");
  bindRegisterButtons(grid);
}

function cardHtml(c) {
  return `
    <article class="card" style="--accent:${c.accent}">
      <div class="card__creature">${c.creature}</div>
      <div class="card__body">
        <span class="card__level">${c.level}</span>
        <h3 class="card__name">${c.name}</h3>
        <p class="card__nameth">${c.nameTh} · ผู้พิทักษ์: ${c.creatureName}</p>
        <p class="card__desc">${c.description}</p>
        <dl class="card__info">
          <div><dt>📅 วัน</dt><dd>${c.day} ${c.dateLabel}</dd></div>
          <div><dt>⏰ เวลา</dt><dd>${c.time}</dd></div>
          <div><dt>📍 ห้อง</dt><dd>${c.room}</dd></div>
          <div><dt>👩‍🏫 ครูผู้ดูแล</dt><dd>${c.teacher}</dd></div>
          <div><dt>🏆 รางวัล</dt><dd>${c.prize}</dd></div>
        </dl>
      </div>
      <button class="btn btn--primary btn--block" data-register="${c.id}">⚔️ สมัครด่านนี้</button>
    </article>`;
}

/* ---------- ศึกใหญ่ Math to Tower ---------- */
function renderGrand() {
  const c = GRAND_COMPETITION;
  $("#grand-event").innerHTML = `
    <article class="grand-card" style="--accent:${c.accent}">
      <div class="grand-card__icon">${c.creature}</div>
      <div class="grand-card__body">
        <span class="card__level grand-card__level">${c.level}</span>
        <h3 class="grand-card__name">${c.name}</h3>
        <p class="grand-card__nameth">${c.nameTh}</p>
        <p class="grand-card__desc">${c.description}</p>
        <dl class="card__info">
          <div><dt>📅 วัน</dt><dd>${c.day} ${c.dateLabel}</dd></div>
          <div><dt>⏰ เวลา</dt><dd>${c.time}</dd></div>
          <div><dt>📍 สถานที่</dt><dd>${c.room}</dd></div>
          <div><dt>👥 ทีม</dt><dd>${c.teamSize} คน/ทีม</dd></div>
          <div><dt>👩‍🏫 ครูผู้ดูแล</dt><dd>${c.teacher}</dd></div>
          <div><dt>🏆 รางวัล</dt><dd>${c.prize}</dd></div>
        </dl>
        <button class="btn btn--gold btn--block" data-register="${c.id}">🏰 รวมทีมพิชิตหอคอย</button>
      </div>
    </article>`;
  bindRegisterButtons($("#grand-event"));
}

/* ---------- จิตอาสา: รายการให้เลือก ---------- */
function renderVolunteerTasks() {
  const wrap = $("#volunteer-tasks");
  wrap.innerHTML = getVolunteerTasks()
    .map(
      (t) => `
      <label class="vol-task">
        <input type="checkbox" name="tasks" value="${t.id}" />
        <span class="vol-task__main">${t.label}</span>
        <span class="vol-task__meta">${t.day} ${t.dateLabel} · ห้อง ${t.room} · รับ ${t.slots} คน</span>
      </label>`
    )
    .join("");
}

/* ---------- MODAL ---------- */
function bindRegisterButtons(root) {
  $$("[data-register]", root).forEach((btn) =>
    btn.addEventListener("click", () => openRegister(btn.dataset.register))
  );
}

function findCompetition(id) {
  return ALL_COMPETITIONS.find((c) => c.id === id);
}

function openRegister(id) {
  const c = findCompetition(id);
  if (!c) return;
  if (!CONFIG.REGISTRATION_OPEN) {
    showToast("ขณะนี้ปิดรับสมัครแล้ว", "warn");
    return;
  }
  const modal = $("#register-modal");
  $("#modal-title").textContent = `สมัคร: ${c.name} (${c.level})`;
  $("#modal-meta").innerHTML = `
    <span>${c.creature} ${c.creatureName}</span>
    <span>📅 ${c.day} ${c.dateLabel}</span>
    <span>⏰ ${c.time}</span>
    <span>📍 ห้อง ${c.room}</span>`;

  const form = $("#register-form");
  form.reset();
  form.competitionId.value = c.id;
  $("#register-status").textContent = "";

  // สร้างฟิลด์สมาชิกตามขนาดทีม
  const teamWrap = $("#team-fields");
  if (c.teamSize > 1) {
    let html = `<label>ชื่อทีม <span class="req">*</span>
        <input type="text" name="teamName" required placeholder="ตั้งชื่อทีมของคุณ" /></label>`;
    for (let i = 1; i <= c.teamSize; i++) {
      html += `
        <div class="form__row team-member">
          <label>สมาชิกคนที่ ${i} — ชื่อ-นามสกุล <span class="req">*</span>
            <input type="text" name="member${i}Name" required placeholder="ชื่อ-นามสกุล" /></label>
          <label>ชั้น/ห้อง <span class="req">*</span>
            <input type="text" name="member${i}Class" required placeholder="เช่น ม.4/1" /></label>
        </div>`;
    }
    teamWrap.innerHTML = html;
  } else {
    teamWrap.innerHTML = `
      <div class="form__row">
        <label>ชื่อ - นามสกุล <span class="req">*</span>
          <input type="text" name="name" required placeholder="เช่น เด็กชายคณิต รักเลข" /></label>
        <label>ชั้น / ห้อง <span class="req">*</span>
          <input type="text" name="classroom" required placeholder="เช่น ม.3/4" /></label>
      </div>`;
  }

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = $("#register-modal");
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function initModal() {
  $$("#register-modal [data-close]").forEach((el) => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

/* ---------- ส่งใบสมัครแข่งขัน ---------- */
function initRegisterForm() {
  const form = $("#register-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const c = findCompetition(form.competitionId.value);
    const status = $("#register-status");
    const btn = form.querySelector("button[type=submit]");
    const fd = new FormData(form);

    const payload = {
      kind: "competition",
      competitionId: c.id,
      competitionName: `${c.name} (${c.level})`,
      type: c.type,
      studentId: fd.get("studentId").trim(),
      contact: fd.get("contact").trim(),
      advisor: (fd.get("advisor") || "").trim(),
    };

    if (c.teamSize > 1) {
      payload.teamName = fd.get("teamName").trim();
      payload.members = [];
      for (let i = 1; i <= c.teamSize; i++) {
        payload.members.push({
          name: fd.get(`member${i}Name`).trim(),
          classroom: fd.get(`member${i}Class`).trim(),
        });
      }
      // แสดงชื่อรวมเพื่อให้แอดมินอ่านง่าย
      payload.name = `[ทีม] ${payload.teamName}`;
    } else {
      payload.name = fd.get("name").trim();
      payload.classroom = fd.get("classroom").trim();
    }

    btn.disabled = true;
    status.textContent = "⏳ กำลังส่ง...";
    status.className = "form__status";

    const res = await submitRecord(payload);
    btn.disabled = false;

    if (res.ok) {
      closeModal();
      showToast(
        res.offline
          ? "✅ บันทึกการสมัครเรียบร้อย (โหมดออฟไลน์)"
          : "✅ สมัครเรียบร้อย! พบกันในป่าหิมพานต์",
        "ok"
      );
    } else {
      status.textContent = "❌ " + (res.message || "เกิดข้อผิดพลาด กรุณาลองใหม่");
      status.className = "form__status form__status--err";
    }
  });
}

/* ---------- ส่งใบสมัครจิตอาสา ---------- */
function initVolunteerForm() {
  const form = $("#volunteer-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = $("#volunteer-status");
    const btn = form.querySelector("button[type=submit]");
    const fd = new FormData(form);
    const tasks = fd.getAll("tasks");

    if (tasks.length === 0) {
      status.textContent = "⚠️ กรุณาเลือกอย่างน้อย 1 รายการที่ต้องการช่วย";
      status.className = "form__status form__status--err";
      return;
    }

    const payload = {
      kind: "volunteer",
      name: fd.get("name").trim(),
      classroom: fd.get("classroom").trim(),
      studentId: fd.get("studentId").trim(),
      contact: fd.get("contact").trim(),
      tasks,
      tasksLabel: tasks.map((id) => {
        const c = findCompetition(id);
        return c ? `${c.name} (${c.day} ${c.dateLabel})` : id;
      }),
      note: (fd.get("note") || "").trim(),
    };

    btn.disabled = true;
    status.textContent = "⏳ กำลังส่ง...";
    status.className = "form__status";

    const res = await submitRecord(payload);
    btn.disabled = false;

    if (res.ok) {
      form.reset();
      status.textContent = res.offline
        ? "✅ รับสมัครจิตอาสาเรียบร้อย (โหมดออฟไลน์) ขอบคุณผู้พิทักษ์!"
        : "✅ รับสมัครจิตอาสาเรียบร้อย ขอบคุณผู้พิทักษ์ป่าหิมพานต์!";
      status.className = "form__status form__status--ok";
      showToast("🛡️ ขอบคุณที่อาสาช่วยงาน!", "ok");
    } else {
      status.textContent = "❌ " + (res.message || "เกิดข้อผิดพลาด กรุณาลองใหม่");
      status.className = "form__status form__status--err";
    }
  });
}

/* ---------- Toast ---------- */
let toastTimer;
function showToast(msg, kind = "ok") {
  const el = $("#toast");
  el.textContent = msg;
  el.className = "toast toast--show toast--" + kind;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => (el.className = "toast"), 3500);
}
