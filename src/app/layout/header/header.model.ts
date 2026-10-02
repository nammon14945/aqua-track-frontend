export type NotificationTone = 'info' | 'warning' | 'success';

export interface AppNotification {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly time: string;
  readonly icon: string;
  readonly tone: NotificationTone;
  readonly unread: boolean;
}

export const NOTIFICATION_BADGE_COUNT = 5;

export const MOCK_NOTIFICATIONS: readonly AppNotification[] = [
  {
    id: 'order-new',
    title: 'ออเดอร์ใหม่ด่วน (#ORD-2891)',
    description: 'บจก. สยามเทรดดิ้ง ขอเพิ่ม 15 ถัง สาย 1 (บางนา)',
    time: '5 นาทีที่แล้ว',
    icon: 'lucideTruck',
    tone: 'info',
    unread: true,
  },
  {
    id: 'overdue-ar',
    title: 'ลูกหนี้ค้างชำระเกิน 15 วัน',
    description: 'โรงแรม ริเวอร์บูทีค ยอด ฿38,500 ถึงกำหนดวางบิล',
    time: '24 นาทีที่แล้ว',
    icon: 'lucideTriangleAlert',
    tone: 'warning',
    unread: true,
  },
  {
    id: 'bottle-shortage',
    title: 'ถังเปล่าค้างคืนไม่ครบ',
    description: 'สายส่ง 2 ค้างรับคืน 12 ใบ ร้านข้าวแกงป้าพร',
    time: '1 ชม. ที่แล้ว',
    icon: 'lucideMilk',
    tone: 'success',
    unread: false,
  },
];

export type SearchResultTone = 'info' | 'warning' | 'neutral';

export type SearchResultTagTone = 'success' | 'info' | 'neutral';

export interface SearchResultItem {
  readonly id: string;
  readonly icon: string;
  readonly title: string;
  readonly meta: string;
  readonly tone: SearchResultTone;
  readonly tag: string;
  readonly tagTone: SearchResultTagTone;
}

export const RECENT_SEARCHES: readonly string[] = ['1ฒข-4521 (สาย 1)', 'ORD-20240524-089'];

export const MOCK_SEARCH_RESULTS: readonly SearchResultItem[] = [
  {
    id: 'cust-00102',
    icon: 'lucideBuilding2',
    title: 'บจก. สยามเทรดดิ้ง (สำนักงานใหญ่)',
    meta: 'CUST-00102 • โซนบางนา • สมาชิกรายเดือน',
    tone: 'info',
    tag: 'จัดส่งวันนี้',
    tagTone: 'success',
  },
  {
    id: 'ord-1092',
    icon: 'lucideReceipt',
    title: '#ORD-1092 (สยามเทรดดิ้ง)',
    meta: 'น้ำถัง 18.9 ลิตร 20 ถัง • 09:00 น.',
    tone: 'warning',
    tag: 'สายรถ 1',
    tagTone: 'info',
  },
  {
    id: 'driver-siam',
    icon: 'lucideUser',
    title: 'คุณสยาม แสนสุข (คนขับรถ)',
    meta: 'ทะเบียน 1ฒข-4521 • โทร 081-456-7890',
    tone: 'neutral',
    tag: 'กำลังวิ่ง',
    tagTone: 'neutral',
  },
];
