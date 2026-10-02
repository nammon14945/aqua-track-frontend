export interface SidebarNavItem {
  readonly label: string;
  readonly icon: string;
  readonly route: string;
  readonly badge?: number;
}

export interface SidebarNavGroup {
  readonly label: string;
  readonly items: readonly SidebarNavItem[];
}

/**
 * เมนูหลักของแถบนำทางด้านข้าง — 4 กลุ่ม ตามสเปก Stitch
 * (ยังไม่มีกลุ่ม "ระบบ" — ตั้งค่า/ออกจากระบบอยู่ใน footer ของ sidebar)
 */
export const SIDEBAR_NAV: readonly SidebarNavGroup[] = [
  {
    label: 'ภาพรวม',
    items: [{ label: 'แดชบอร์ด', icon: 'lucideLayoutDashboard', route: '/dashboard' }],
  },
  {
    label: 'การดำเนินงาน',
    items: [
      { label: 'ออเดอร์ & สายรถส่งน้ำ', icon: 'lucideTruck', route: '/orders', badge: 5 },
      { label: 'ถังน้ำเปล่า', icon: 'lucideMilk', route: '/bottles' },
      { label: 'คลังสินค้า', icon: 'lucideBoxes', route: '/inventory' },
    ],
  },
  {
    label: 'การเงิน',
    items: [
      { label: 'การเงิน & ลูกหนี้', icon: 'lucideWallet', route: '/finance' },
      { label: 'คูปอง & สมาชิก', icon: 'lucideTicket', route: '/coupons' },
    ],
  },
  {
    label: 'ข้อมูลหลัก',
    items: [
      { label: 'ลูกค้า', icon: 'lucideUsers', route: '/customers' },
      { label: 'สินค้า & ราคา', icon: 'lucideTag', route: '/products' },
    ],
  },
];
