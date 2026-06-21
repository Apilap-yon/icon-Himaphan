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
  APPS_SCRIPT_URL: "https://script.googleusercontent.com/a/macros/lsp.ac.th/echo?user_content_key=AUkAhnSGGNKFWumLdPz8eYasU9kbsgGjEnZZ70hIRmUYUHcyDNT5JZVtGCBR7QEJGSEgGbGy1j_djoZCN9C93QcSZMY_7VWDEldmwysnQuhOOqjxFFQbsOrr8Pr05rVee6O8NBnPbD2FmrDZMfmcOL4Z1OSSGR8V9rZnH6_8N0rhn0RYELEiVYGkhEbMPbZKV6xVF1d1jHXHeVcanpcfRUIGI9V03seYniyHTqD0uFw9KGulWthoMWBECtsr5WQTAraBTQnbBiNkSbbb2fMgDAVi2LjXuA83Z78YruyZbtIo&lib=MvtoC1xnl_m3RGriv61MQPjE3UVEaUg8E",

  // รหัสผ่านสำหรับเปิดหน้าแอดมิน (เปลี่ยนได้)
  ADMIN_PASSCODE: "mathweek2026",

  // เปิด/ปิดระบบรับสมัคร
  REGISTRATION_OPEN: true,
};
