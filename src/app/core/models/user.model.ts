export interface UserProfile {
  readonly name: string;
  readonly role: string;
  readonly initials: string;
  readonly email: string;
}

/**
 * Mock ผู้ใช้ปัจจุบันสำหรับ layout shell (header/sidebar)
 * จะถูกแทนที่ด้วยข้อมูลจริงเมื่อทำ Auth (P8 ตาม docs/08)
 */
export const CURRENT_USER: UserProfile = {
  name: 'สมชาย ใจดี',
  role: 'ผู้จัดการ',
  initials: 'สม',
  email: 'somchai@aquatrack.co.th',
};
