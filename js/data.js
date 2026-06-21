/* ============================================================================
 *  Math Week 2026 — "Math Isekai"
 *  ข้อมูลการแข่งขัน (Competition data)
 *
 *  หมายเหตุ: ฟิลด์ที่ทำเครื่องหมาย  /* TODO จาก GG Sheet */  /* คือข้อมูลที่อยู่ใน
 *  Google Sheet (หน้า "รายละเอียดกิจกรรม") ซึ่งระบบดึงอัตโนมัติไม่ได้
 *  กรุณากรอกแทนค่าตัวอย่างให้ตรงกับชีต:
 *     teacher        = คอลัมน์ C (ครูผู้ดูแล)
 *     description     = คอลัมน์ D (รายละเอียดกิจกรรม)
 *     prize          = คอลัมน์ J (รางวัล)
 *     volunteerSlots = คอลัมน์ H (จำนวนจิตอาสาที่ใช้ในแต่ละรายการ)
 * ========================================================================== */

const EVENT_INFO = {
  title: "Math Week 2026",
  theme: "Math Isekai",
  subtitle: "ต่างโลกแห่งคณิตศาสตร์ — ผจญภัยในป่าหิมพานต์",
  contestTime: "16.30 – 17.30 น.",
};

/* การแข่งขันรายบุคคล 7 รายการ */
const COMPETITIONS = [
  {
    id: "sudoku",
    name: "Sudoku",
    nameTh: "ซูโดกุ",
    level: "ม.1 – ม.6",
    day: "จันทร์",
    dateLabel: "13 ก.ค.",
    isoDate: "2026-07-13",
    time: "16.30 – 17.30 น.",
    room: "412",
    type: "individual",
    teamSize: 1,
    creature: "🦢",
    creatureName: "หงส์",
    accent: "#3aa6b9",
    teacher: "— (กรอกจากชีต คอลัมน์ C) —",            /* TODO จาก GG Sheet */
    description: "เติมตัวเลขลงในตารางตามกติกาซูโดกุให้ครบถ้วนและถูกต้องที่สุดภายในเวลาที่กำหนด (รายละเอียดจริงดูจากชีต คอลัมน์ D)", /* TODO จาก GG Sheet */
    prize: "— (กรอกจากชีต คอลัมน์ J) —",               /* TODO จาก GG Sheet */
    volunteerSlots: 4,                                  /* TODO จาก GG Sheet คอลัมน์ H */
  },
  {
    id: "math-genius-junior",
    name: "Math Genius",
    nameTh: "อัจฉริยะคณิตศาสตร์",
    level: "ม.1 – ม.3",
    day: "อังคาร",
    dateLabel: "14 ก.ค.",
    isoDate: "2026-07-14",
    time: "16.30 – 17.30 น.",
    room: "412",
    type: "individual",
    teamSize: 1,
    creature: "🐉",
    creatureName: "นาคราช",
    accent: "#2e8b57",
    teacher: "— (กรอกจากชีต คอลัมน์ C) —",
    description: "ทดสอบทักษะการคิดคำนวณและการแก้โจทย์ปัญหาคณิตศาสตร์ระดับ ม.ต้น (รายละเอียดจริงดูจากชีต คอลัมน์ D)",
    prize: "— (กรอกจากชีต คอลัมน์ J) —",
    volunteerSlots: 4,
  },
  {
    id: "math-genius-senior",
    name: "Math Genius",
    nameTh: "อัจฉริยะคณิตศาสตร์",
    level: "ม.4 – ม.6",
    day: "อังคาร",
    dateLabel: "14 ก.ค.",
    isoDate: "2026-07-14",
    time: "16.30 – 17.30 น.",
    room: "406",
    type: "individual",
    teamSize: 1,
    creature: "🦚",
    creatureName: "นกยูงทอง",
    accent: "#8e44ad",
    teacher: "— (กรอกจากชีต คอลัมน์ C) —",
    description: "ทดสอบทักษะการคิดคำนวณและการแก้โจทย์ปัญหาคณิตศาสตร์ระดับ ม.ปลาย (รายละเอียดจริงดูจากชีต คอลัมน์ D)",
    prize: "— (กรอกจากชีต คอลัมน์ J) —",
    volunteerSlots: 4,
  },
  {
    id: "iq180-junior",
    name: "IQ 180",
    nameTh: "ไอคิว 180",
    level: "ม.1 – ม.3",
    day: "พุธ",
    dateLabel: "15 ก.ค.",
    isoDate: "2026-07-15",
    time: "16.30 – 17.30 น.",
    room: "412",
    type: "individual",
    teamSize: 1,
    creature: "🦅",
    creatureName: "นกหัสดีลิงค์",
    accent: "#e67e22",
    teacher: "— (กรอกจากชีต คอลัมน์ C) —",
    description: "เกมคิดเลขเร็วและไหวพริบ IQ180 สำหรับระดับ ม.ต้น (รายละเอียดจริงดูจากชีต คอลัมน์ D)",
    prize: "— (กรอกจากชีต คอลัมน์ J) —",
    volunteerSlots: 4,
  },
  {
    id: "iq180-senior",
    name: "IQ 180",
    nameTh: "ไอคิว 180",
    level: "ม.4 – ม.6",
    day: "พุธ",
    dateLabel: "15 ก.ค.",
    isoDate: "2026-07-15",
    time: "16.30 – 17.30 น.",
    room: "406",
    type: "individual",
    teamSize: 1,
    creature: "🦁",
    creatureName: "ราชสีห์",
    accent: "#c0392b",
    teacher: "— (กรอกจากชีต คอลัมน์ C) —",
    description: "เกมคิดเลขเร็วและไหวพริบ IQ180 สำหรับระดับ ม.ปลาย (รายละเอียดจริงดูจากชีต คอลัมน์ D)",
    prize: "— (กรอกจากชีต คอลัมน์ J) —",
    volunteerSlots: 4,
  },
  {
    id: "tangram",
    name: "Tangram",
    nameTh: "แทนแกรม",
    level: "ม.1 – ม.3",
    day: "พฤหัสบดี",
    dateLabel: "16 ก.ค.",
    isoDate: "2026-07-16",
    time: "16.30 – 17.30 น.",
    room: "412",
    type: "individual",
    teamSize: 1,
    creature: "🐘",
    creatureName: "ช้างเอราวัณ",
    accent: "#16a085",
    teacher: "— (กรอกจากชีต คอลัมน์ C) —",
    description: "ต่อภาพจากชิ้นส่วนเรขาคณิตแทนแกรมให้ตรงตามโจทย์ (รายละเอียดจริงดูจากชีต คอลัมน์ D)",
    prize: "— (กรอกจากชีต คอลัมน์ J) —",
    volunteerSlots: 4,
  },
  {
    id: "checkers",
    name: "Checkers",
    nameTh: "หมากฮอส",
    level: "ม.1 – ม.6",
    day: "ศุกร์",
    dateLabel: "17 ก.ค.",
    isoDate: "2026-07-17",
    time: "16.30 – 17.30 น.",
    room: "406",
    type: "individual",
    teamSize: 1,
    creature: "🐯",
    creatureName: "พยัคฆ์",
    accent: "#d35400",
    teacher: "— (กรอกจากชีต คอลัมน์ C) —",
    description: "การแข่งขันหมากฮอสประลองกลยุทธ์ (รายละเอียดจริงดูจากชีต คอลัมน์ D)",
    prize: "— (กรอกจากชีต คอลัมน์ J) —",
    volunteerSlots: 4,
  },
];

/* การแข่งขันใหญ่ ประเภททีม 3 คน */
const GRAND_COMPETITION = {
  id: "math-to-tower",
  name: "Math to Tower",
  nameTh: "พิชิตหอคอยคณิตศาสตร์",
  level: "ม.1 – ม.6 (ทีม 3 คน)",
  day: "อังคาร",
  dateLabel: "21 ก.ค.",
  isoDate: "2026-07-21",
  time: "16.30 – 17.45 น.",
  room: "ห้องสมุด (Library Room)",
  type: "team",
  teamSize: 3,
  creature: "🏯",
  creatureName: "หอคอยเวทมนตร์",
  accent: "#b8860b",
  teacher: "— (กรอกจากชีต คอลัมน์ C) —",
  description: "ศึกใหญ่ประจำสัปดาห์! รวมทีม 3 คนพิชิตด่านโจทย์คณิตศาสตร์ไต่ขึ้นสู่ยอดหอคอย (รายละเอียดจริงดูจากชีต คอลัมน์ D)",
  prize: "— (กรอกจากชีต คอลัมน์ J) —",
  volunteerSlots: 6,
};

const ALL_COMPETITIONS = [...COMPETITIONS, GRAND_COMPETITION];

/* รายการจิตอาสาแยกตามวัน (รวม Math to Tower) — จำนวนที่รับมาจากคอลัมน์ H */
function getVolunteerTasks() {
  return ALL_COMPETITIONS.map((c) => ({
    id: c.id,
    label: `${c.name} (${c.level})`,
    day: c.day,
    dateLabel: c.dateLabel,
    room: c.room,
    slots: c.volunteerSlots,
  }));
}
