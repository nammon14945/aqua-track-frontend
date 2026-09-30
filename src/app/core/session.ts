/**
 * ข้อมูลผู้ใช้ที่ล็อกอินอยู่ — รวมไว้ที่เดียวเพื่อให้ทุกหน้าจอใช้แหล่งเดียวกัน
 * เมื่อต่อ API จริง ให้เปลี่ยนมาโหลดจาก service แล้ว expose ผ่าน `CURRENT_USER` เดิม
 */
export interface SessionUser {
  readonly name: string;
  readonly role: string;
  /** ตัวอักษรย่อสำหรับ avatar fallback (2 ตัวอักษร) */
  readonly initials: string;
}

export const CURRENT_USER: SessionUser = {
  name: 'สมศักดิ์ สุวรรณเมธา',
  role: 'ผู้ดูแลระบบ & ฝ่ายบัญชี',
  initials: 'สศ',
};
