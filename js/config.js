/* ============================================================================
 *  ตั้งค่าการเชื่อมต่อหลังบ้าน (Backend configuration)
 *
 *  วิธีเชื่อมกับ Google Sheet:
 *   1) เปิด Google Sheet ที่ต้องการเก็บข้อมูลผู้สมัคร
 *   2) เมนู Extensions ▸ Apps Script  แล้ววางโค้ดจากไฟล์
 *      apps-script/Code.gs ลงไป
 *   3) กด Deploy ▸ New deployment ▸ เลือกชนิด "Web app"
 *        - Execute as: Me
 *        - Who has access: Anyone
 *   4) คัดลอก URL ที่ได้ (ลงท้ายด้วย /exec) มาวางในช่อง APPS_SCRIPT_URL ด้านล่าง
 *
 *  ถ้าปล่อยว่าง ("") ระบบจะบันทึกข้อมูลลง localStorage ในเครื่องผู้ใช้แทน
 *  (ดู/ส่งออกได้ที่หน้า admin.html) เพื่อให้เดโมได้ทันทีโดยไม่ต้องตั้งค่า
 * ========================================================================== */

const CONFIG = {
  // วาง URL ของ Apps Script Web App ที่นี่ เช่น "https://script.google.com/macros/s/AKfyc.../exec"
  APPS_SCRIPT_URL: "",

  // รหัสผ่านสำหรับเปิดหน้าแอดมิน (เปลี่ยนได้)
  ADMIN_PASSCODE: "mathweek2026",

  // เปิด/ปิดระบบรับสมัคร
  REGISTRATION_OPEN: true,
};
