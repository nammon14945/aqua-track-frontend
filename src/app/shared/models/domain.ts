export type OrderStatus = 'pending' | 'in-transit' | 'delivered' | 'cancelled';

export type ChipStatus = OrderStatus | 'credit' | 'damaged' | 'active' | 'paused' | 'neutral';

export type PaymentMode = 'cash' | 'slip' | 'coupon' | 'credit';

export interface PaymentModeOption {
  readonly value: PaymentMode;
  readonly label: string;
  readonly description: string;
  readonly icon: string;
}

export const ORDER_STATUS_LABEL: Record<ChipStatus, string> = {
  pending: 'รอดำเนินการ',
  'in-transit': 'กำลังส่ง',
  delivered: 'ส่งสำเร็จ',
  cancelled: 'ยกเลิก',
  credit: 'ค้างชำระ',
  damaged: 'ถังชำรุด',
  active: 'ใช้งาน',
  paused: 'พักใช้งาน',
  neutral: 'ไม่ระบุ',
};

export const PAYMENT_MODES: readonly PaymentModeOption[] = [
  { value: 'cash', label: 'เงินสด', description: 'รับเงินสด', icon: 'lucideBanknote' },
  { value: 'slip', label: 'สลิปโอน', description: 'แนบสลิป', icon: 'lucideReceipt' },
  { value: 'coupon', label: 'คูปอง', description: 'ตัดยอดตั๋วน้ำ', icon: 'lucideTicket' },
  { value: 'credit', label: 'เครดิต', description: 'บันทึกค้างชำระ', icon: 'lucideClock' },
];
