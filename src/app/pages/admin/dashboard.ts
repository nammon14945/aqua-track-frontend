import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmPaginationImports } from '@spartan-ng/helm/pagination';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';
import { toast } from '@spartan-ng/brain/sonner';
import {
  FilterChips,
  type FilterChipItem,
} from '../../shared/components/filter-chips/filter-chips';
import { KpiCard } from '../../shared/components/kpi-card/kpi-card';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { PaymentChip } from '../../shared/components/payment-chip/payment-chip';
import { type ProgressTone } from '../../shared/components/progress-bar/progress-bar';
import { RouteProgressRow } from '../../shared/components/route-progress-row/route-progress-row';
import { StatusChip } from '../../shared/components/status-chip/status-chip';
import { type ChipStatus, type PaymentMode } from '../../shared/models/domain';
import { ThaiDatePipe } from '../../shared/pipes/thai-date.pipe';
import { ThbPipe } from '../../shared/pipes/thb.pipe';
import { formatThaiDateTimeShort, formatThb } from '../../shared/utils/format';

interface DebtorAlert {
  readonly name: string;
  readonly dueDate: string;
  readonly overdueDays: number;
  readonly amount: number;
}

interface TruckRoute {
  readonly truckNo: string;
  readonly title: string;
  readonly driverName: string;
  readonly driverPhone: string;
  readonly status: ChipStatus;
  readonly statusLabel: string;
  /** สีของป้ายสถานะเมื่อต้องการเน้นต่างจากความหมายของสถานะ (เช่น สายรถล่าช้า) */
  readonly statusTone: ChipStatus | null;
  readonly pulse: boolean;
  readonly bottleDelivered: number;
  readonly bottleLoaded: number;
  readonly deliveredStops: number;
  readonly emptyReturned: number;
  readonly note: string | null;
  readonly eta: string;
  readonly badgeTone: 'brand' | 'teal' | 'violet';
  readonly progressTone: ProgressTone;
}

interface RecentOrder {
  readonly code: string;
  readonly orderedAt: string;
  readonly customer: string;
  readonly customerDetail: string;
  readonly items: string;
  readonly route: string;
  readonly amount: number;
  readonly payment: PaymentMode | null;
  readonly paymentLabel: string | null;
  readonly status: ChipStatus;
  readonly cancelled?: boolean;
}

@Component({
  selector: 'app-admin-dashboard',
  imports: [
    NgIcon,
    HlmBadgeImports,
    HlmButtonImports,
    HlmPaginationImports,
    HlmTableImports,
    HlmTooltipImports,
    FilterChips,
    KpiCard,
    PageHeader,
    PaymentChip,
    RouteProgressRow,
    StatusChip,
    ThaiDatePipe,
    ThbPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-page-header
      title="ภาพรวมการดำเนินงานวันนี้"
      description="อัปเดตข้อมูลล่าสุดเมื่อเวลา 14:35 น. • รถขนส่งกำลังปฏิบัติงาน 3 คัน"
    >
      <button hlmBtn variant="outline" (click)="notifyComingSoon('ดาวน์โหลดรายงานประจำวัน')">
        <ng-icon name="lucideDownload" data-icon="inline-start" />
        ดาวน์โหลดรายงานประจำวัน (PDF/Excel)
      </button>
      <button hlmBtn (click)="notifyComingSoon('เปิดออเดอร์ใหม่')">
        <ng-icon name="lucidePlus" data-icon="inline-start" />
        เปิดออเดอร์ใหม่
      </button>
    </app-page-header>

    <div class="flex flex-col gap-6">
      <!-- KPI -->
      <section class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <app-kpi-card
          label="น้ำพร้อมส่งในโรงงาน"
          [value]="formatNumber(3450)"
          unit="ถัง"
          icon="lucideDroplet"
          tone="brand"
        />
        <app-kpi-card
          label="น้ำระหว่างขนส่ง"
          [value]="formatNumber(1120)"
          unit="ถัง"
          icon="lucideTruck"
          tone="teal"
        />
        <app-kpi-card
          label="ถังเปล่ารับคืนวันนี้"
          [value]="formatNumber(980)"
          unit="ถัง"
          icon="lucideRecycle"
          tone="success"
        />
        <app-kpi-card
          label="ออเดอร์ประจำวัน"
          [value]="formatNumber(146)"
          unit="รายการ"
          icon="lucideBoxes"
          tone="violet"
        />
        <app-kpi-card
          label="ยอดค้างชำระรวม"
          [value]="formatThb(186400, { decimals: 0 })"
          icon="lucideWallet"
          tone="credit"
          [valueAccent]="true"
        />
      </section>

      <!-- Middle: routes + credit alerts -->
      <div class="grid gap-6 lg:grid-cols-12">
        <section class="flex flex-col lg:col-span-8">
          <div class="bg-card flex h-full flex-col rounded-xl border shadow-soft-sm">
            <header class="flex flex-wrap items-center justify-between gap-2 border-b p-5">
              <div class="flex items-center gap-2">
                <ng-icon name="lucideRoute" class="text-brand-600" />
                <h2 class="text-h4">สถานะรถส่งน้ำประจำวัน</h2>
              </div>
              <span class="text-caption text-muted-foreground">ออกปฏิบัติการครบ 3 สายรถ</span>
            </header>
            <div class="flex flex-1 flex-col gap-4 p-5">
              @for (route of routes; track route.truckNo) {
                <app-route-progress-row
                  [truckNo]="route.truckNo"
                  [title]="route.title"
                  [driverName]="route.driverName"
                  [driverPhone]="route.driverPhone"
                  [status]="route.status"
                  [statusLabel]="route.statusLabel"
                  [statusTone]="route.statusTone"
                  [pulse]="route.pulse"
                  [bottleDelivered]="route.bottleDelivered"
                  [bottleLoaded]="route.bottleLoaded"
                  [deliveredStops]="route.deliveredStops"
                  [emptyReturned]="route.emptyReturned"
                  [note]="route.note"
                  [eta]="route.eta"
                  [badgeTone]="route.badgeTone"
                  [progressTone]="route.progressTone"
                />
              }
            </div>
          </div>
        </section>

        <aside class="flex flex-col lg:col-span-4">
          <div
            class="bg-card flex h-full flex-col rounded-xl border border-warning-border shadow-soft-sm"
          >
            <header class="flex items-start justify-between gap-3 p-5 pb-3">
              <div class="flex items-center gap-2">
                <span
                  class="bg-warning-soft text-warning-soft-foreground flex size-7 items-center justify-center rounded-md [&_ng-icon]:text-[length:--spacing(4)]"
                >
                  <ng-icon name="lucideBell" />
                </span>
                <h3 class="text-body-sm font-bold">ลูกหนี้ค้างชำระเกินกำหนด</h3>
              </div>
              <span
                class="bg-warning-soft text-warning-soft-foreground shrink-0 rounded border border-warning-border px-2 py-0.5 text-[11px] font-semibold"
              >
                แจ้งเตือนฝ่ายบัญชี
              </span>
            </header>

            <p class="text-caption text-muted-foreground px-5 pb-4">
              รายการลูกค้านิติบุคคลที่เครดิตเทอมเกินกำหนด เกิน 5 วันขึ้นไป
            </p>

            <div class="flex flex-1 flex-col gap-3 px-5">
              @for (debtor of debtors; track debtor.name; let first = $first) {
                <div
                  class="flex flex-col gap-2.5 rounded-lg border p-3"
                  [class]="
                    first ? 'border-warning-border bg-warning-soft/50' : 'border-border bg-muted/40'
                  "
                >
                  <div class="flex items-start justify-between gap-3">
                    <div class="flex min-w-0 flex-col">
                      <h4 class="text-caption font-bold">{{ debtor.name }}</h4>
                      <p class="text-caption text-muted-foreground">
                        ครบกำหนด: {{ debtor.dueDate | thaiDate }} (<span
                          class="font-semibold"
                          [class]="
                            debtor.overdueDays >= 10
                              ? 'text-danger-soft-foreground'
                              : 'text-warning-soft-foreground'
                          "
                          >ค้าง {{ debtor.overdueDays }} วัน</span
                        >)
                      </p>
                    </div>
                    <span
                      class="text-caption font-bold tabular-nums"
                      [class]="first ? 'text-warning-soft-foreground' : ''"
                      data-numeric
                      >{{ debtor.amount | thb: 0 }}</span
                    >
                  </div>

                  <div class="flex items-center gap-2">
                    @if (first) {
                      <button
                        hlmBtn
                        size="xs"
                        class="bg-brand-amber-600 hover:bg-brand-amber-700 text-white flex-1"
                        (click)="remind(debtor)"
                      >
                        <ng-icon name="lucideSend" data-icon="inline-start" />
                        ส่ง SMS ทวงถาม
                      </button>
                      <button hlmBtn size="xs" variant="outline" (click)="remind(debtor)">
                        <ng-icon name="lucidePhone" />
                        โทร
                      </button>
                    } @else {
                      <button
                        hlmBtn
                        size="xs"
                        variant="outline"
                        class="flex-1"
                        (click)="remind(debtor)"
                      >
                        <ng-icon name="lucideMail" data-icon="inline-start" />
                        ส่งอีเมลแจ้งเตือน
                      </button>
                      <button
                        hlmBtn
                        size="icon-xs"
                        variant="outline"
                        hlmTooltip
                        [hlmTooltip]="'โทร ' + debtor.name"
                        [attr.aria-label]="'โทร ' + debtor.name"
                      >
                        <ng-icon name="lucidePhone" />
                      </button>
                    }
                  </div>
                </div>
              }
            </div>

            <div class="p-5 pt-4 text-center">
              <button
                hlmBtn
                variant="link"
                size="sm"
                (click)="notifyComingSoon('รายการลูกหนี้ทั้งหมด')"
              >
                ดูลูกหนี้ทั้งหมด (24 ราย)
                <ng-icon name="lucideArrowRight" data-icon="inline-end" />
              </button>
            </div>
          </div>
        </aside>
      </div>

      <!-- Recent orders -->
      <section class="bg-card flex flex-col rounded-xl border shadow-soft-sm">
        <header
          class="flex flex-col gap-4 border-b p-5 md:flex-row md:items-center md:justify-between"
        >
          <div class="flex items-center gap-2">
            <h2 class="text-h4">รายการออเดอร์ล่าสุด</h2>
            <span hlmBadge variant="secondary">วันนี้ (146)</span>
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <app-filter-chips
              [items]="orderFilters"
              [(value)]="orderFilter"
              ariaLabel="กรองตามสถานะออเดอร์"
            />
            <div class="bg-border mx-1 hidden h-4 w-px sm:block"></div>
            <button
              hlmBtn
              variant="outline"
              size="icon-sm"
              hlmTooltip
              [hlmTooltip]="'ตัวกรองเพิ่มเติม'"
              aria-label="ตัวกรองเพิ่มเติม"
              (click)="notifyComingSoon('ตัวกรองเพิ่มเติม')"
            >
              <ng-icon name="lucideFilter" />
            </button>
          </div>
        </header>

        <div hlmTableContainer class="thin-scrollbar">
          <table hlmTable>
            <thead hlmTHead class="bg-muted sticky top-0 z-10">
              <tr hlmTr class="hover:bg-transparent">
                <th hlmTh class="text-label text-muted-foreground">รหัสออเดอร์</th>
                <th hlmTh class="text-label text-muted-foreground">วันที่ - เวลา</th>
                <th hlmTh class="text-label text-muted-foreground">ชื่อลูกค้า</th>
                <th hlmTh class="text-label text-muted-foreground">รายการสินค้า</th>
                <th hlmTh class="text-label text-muted-foreground">สายรถขนส่ง</th>
                <th hlmTh class="text-label text-muted-foreground text-end">มูลค่ารวม</th>
                <th hlmTh class="text-label text-muted-foreground text-center">วิธีชำระเงิน</th>
                <th hlmTh class="text-label text-muted-foreground text-center">สถานะ</th>
                <th hlmTh class="text-label text-muted-foreground text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody hlmTBody>
              @for (order of orders; track order.code; let odd = $odd) {
                <tr
                  hlmTr
                  [class.bg-muted/30]="odd && !order.cancelled"
                  [class.bg-muted/50]="order.cancelled"
                  [class.text-muted-foreground]="order.cancelled"
                >
                  <td hlmTd class="text-body-sm font-mono font-semibold">
                    <span [class]="order.cancelled ? 'text-muted-foreground' : 'text-brand-600'">
                      {{ order.code }}
                    </span>
                  </td>
                  <td hlmTd class="text-caption text-muted-foreground whitespace-nowrap">
                    {{ formatOrderedAt(order.orderedAt) }}
                  </td>
                  <td hlmTd>
                    <div class="flex flex-col">
                      <span class="text-body-sm font-bold">{{ order.customer }}</span>
                      <span class="text-caption text-muted-foreground">{{
                        order.customerDetail
                      }}</span>
                    </div>
                  </td>
                  <td hlmTd>
                    <span class="text-body-sm inline-flex items-center gap-1.5 font-medium">
                      <ng-icon name="lucideDroplet" class="text-brand-500" />
                      {{ order.items }}
                    </span>
                  </td>
                  <td hlmTd class="text-body-sm">{{ order.route }}</td>
                  <td hlmTd class="text-body-sm text-end font-bold tabular-nums" data-numeric>
                    {{ order.amount | thb: 0 }}
                  </td>
                  <td hlmTd class="text-center">
                    @if (order.payment) {
                      <app-payment-chip
                        [mode]="order.payment"
                        [label]="order.paymentLabel"
                        [showIcon]="false"
                      />
                    } @else {
                      <span class="text-muted-foreground">-</span>
                    }
                  </td>
                  <td hlmTd class="text-center">
                    @if (order.cancelled) {
                      <app-status-chip status="cancelled" [showDot]="false" [label]="'ยกเลิก'" />
                    } @else {
                      <app-status-chip
                        [status]="order.status"
                        [pulse]="order.status === 'in-transit'"
                      />
                    }
                  </td>
                  <td hlmTd class="text-center">
                    <button
                      hlmBtn
                      variant="ghost"
                      size="icon-xs"
                      class="text-muted-foreground"
                      hlmTooltip
                      [hlmTooltip]="order.cancelled ? 'ดูประวัติ' : 'ดูรายละเอียด'"
                      [attr.aria-label]="order.cancelled ? 'ดูประวัติ' : 'ดูรายละเอียด'"
                    >
                      <ng-icon [name]="order.cancelled ? 'lucideHistory' : 'lucideEye'" />
                    </button>
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>

        <footer
          class="flex flex-col gap-3 border-t p-4 text-caption text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            แสดงผลรายการที่ <span class="text-foreground font-bold">1 ถึง 5</span> จากทั้งหมด
            <span class="text-foreground font-bold">146</span> รายการ
          </div>
          <hlm-pagination aria-label="แบ่งหน้ารายการออเดอร์" class="mx-0 w-auto">
            <ul hlmPaginationContent>
              <li hlmPaginationItem>
                <hlm-pagination-previous
                  [iconOnly]="true"
                  aria-label="ก่อนหน้า"
                  class="pointer-events-none opacity-50"
                />
              </li>
              <li hlmPaginationItem>
                <a hlmPaginationLink [isActive]="true">1</a>
              </li>
              <li hlmPaginationItem>
                <a hlmPaginationLink>2</a>
              </li>
              <li hlmPaginationItem>
                <a hlmPaginationLink>3</a>
              </li>
              <li hlmPaginationItem>
                <hlm-pagination-ellipsis />
              </li>
              <li hlmPaginationItem>
                <a hlmPaginationLink>30</a>
              </li>
              <li hlmPaginationItem>
                <hlm-pagination-next [iconOnly]="true" aria-label="ถัดไป" />
              </li>
            </ul>
          </hlm-pagination>
        </footer>
      </section>
    </div>
  `,
})
export class AdminDashboard {
  protected readonly formatThb = formatThb;
  protected readonly formatOrderedAt = formatThaiDateTimeShort;
  protected readonly formatNumber = (value: number) => new Intl.NumberFormat('th-TH').format(value);

  protected readonly routes: readonly TruckRoute[] = [
    {
      truckNo: '1',
      title: 'สายที่ 1: ทะเบียน 1ฒข-4521',
      driverName: 'นิคม แสนสุข',
      driverPhone: '081-456-7890',
      status: 'in-transit',
      statusLabel: 'กำลังส่งจุดที่ 8',
      statusTone: null,
      pulse: true,
      bottleDelivered: 44,
      bottleLoaded: 50,
      deliveredStops: 14,
      emptyReturned: 41,
      note: null,
      eta: '15:45 น.',
      badgeTone: 'brand',
      progressTone: 'brand',
    },
    {
      truckNo: '2',
      title: 'สายที่ 2: ทะเบียน 2ฒฮ-8890',
      driverName: 'ประเสริฐ ยิ้มแย้ม',
      driverPhone: '089-223-9011',
      status: 'in-transit',
      statusLabel: 'กำลังส่งจุดที่ 5',
      statusTone: 'pending',
      pulse: false,
      bottleDelivered: 28,
      bottleLoaded: 45,
      deliveredStops: 9,
      emptyReturned: 25,
      note: 'การจราจรหนาแน่น',
      eta: '17:00 น.',
      badgeTone: 'brand',
      progressTone: 'brand-light',
    },
    {
      truckNo: '3',
      title: 'สายที่ 3: ทะเบียน 3ฒฉ-1204',
      driverName: 'วรวิทย์ เกตุแก้ว',
      driverPhone: '086-778-3412',
      status: 'delivered',
      statusLabel: 'ใกล้เสร็จสิ้น',
      statusTone: null,
      pulse: false,
      bottleDelivered: 36,
      bottleLoaded: 40,
      deliveredStops: 11,
      emptyReturned: 35,
      note: null,
      eta: '15:10 น.',
      badgeTone: 'teal',
      progressTone: 'teal',
    },
  ];

  protected readonly debtors: readonly DebtorAlert[] = [
    { name: 'บจก. สยามอินโนเวชั่น เมกะ', dueDate: '2024-05-09', overdueDays: 15, amount: 42000 },
    { name: 'โรงแรม เดอะ แกรนด์ ธารา', dueDate: '2024-05-16', overdueDays: 8, amount: 38500 },
    {
      name: 'อาคารสำนักงาน แอสเสท ทาวเวอร์',
      dueDate: '2024-05-19',
      overdueDays: 5,
      amount: 24900,
    },
  ];

  protected readonly orderFilters: readonly FilterChipItem[] = [
    { value: 'all', label: 'ทั้งหมด', count: 146 },
    { value: 'pending', label: 'รอดำเนินการ', count: 12 },
    { value: 'in-transit', label: 'ระหว่างขนส่ง', count: 36 },
    { value: 'delivered', label: 'จัดส่งแล้ว', count: 98 },
  ];

  protected readonly orderFilter = 'all';

  protected readonly orders: readonly RecentOrder[] = [
    {
      code: 'ORD-20240524-089',
      orderedAt: '2024-05-24T13:40:00',
      customer: 'โรงพยาบาลกรุงเทพเวชการ',
      customerDetail: 'แผนกบริการผู้ป่วยนอก อาคาร 2',
      items: 'ถัง 18.9L × 40 ถัง',
      route: 'สายที่ 1 (1ฒข-4521)',
      amount: 3200,
      payment: 'credit',
      paymentLabel: 'เครดิต 30 วัน',
      status: 'in-transit',
    },
    {
      code: 'ORD-20240524-088',
      orderedAt: '2024-05-24T12:15:00',
      customer: 'คอนโดลุมพินีเพลส สาทร',
      customerDetail: 'นิติบุคคลอาคารชุด ชั้น G',
      items: 'ถัง 18.9L × 25 ถัง',
      route: 'สายที่ 2 (2ฒฮ-8890)',
      amount: 2000,
      payment: 'slip',
      paymentLabel: 'สลิปโอนเงิน',
      status: 'delivered',
    },
    {
      code: 'ORD-20240524-087',
      orderedAt: '2024-05-24T11:30:00',
      customer: 'บริษัท เคมีคอลพลัส จำกัด',
      customerDetail: 'นิคมอุตสาหกรรม โกดัง 4',
      items: 'ถัง 18.9L × 60 ถัง',
      route: 'สายที่ 3 (3ฒฉ-1204)',
      amount: 4800,
      payment: 'coupon',
      paymentLabel: 'คูปอง (60 ใบ)',
      status: 'delivered',
    },
    {
      code: 'ORD-20240524-086',
      orderedAt: '2024-05-24T14:10:00',
      customer: 'ร้านอาหารเรือนแก้ว (สาขาอารีย์)',
      customerDetail: 'คุณอรุณี (เจ้าของร้าน)',
      items: 'ถัง 18.9L × 15 ถัง',
      route: 'รอจัดสายรถ (รอบบ่าย 2)',
      amount: 1200,
      payment: 'cash',
      paymentLabel: 'เงินสดปลายทาง',
      status: 'pending',
    },
    {
      code: 'ORD-20240524-085',
      orderedAt: '2024-05-24T10:05:00',
      customer: 'โรงเรียนอนุบาลสาธิตพัฒนา',
      customerDetail: 'ลูกค้ายกเลิก: ปิดทำการกระทันหัน',
      items: 'ถัง 18.9L × 30 ถัง',
      route: '-',
      amount: 2400,
      payment: null,
      paymentLabel: null,
      status: 'cancelled',
      cancelled: true,
    },
  ];

  protected remind(debtor: DebtorAlert): void {
    toast.success(`ส่งแจ้งเตือนไปยัง ${debtor.name} แล้ว`, {
      description: `ยอดค้างชำระ ${formatThb(debtor.amount, { decimals: 0 })} · ค้าง ${debtor.overdueDays} วัน`,
    });
  }

  protected notifyComingSoon(feature: string): void {
    toast.info(`${feature} อยู่ระหว่างพัฒนา`, {
      description: 'หน้านี้จะเปิดใช้งานในรอบถัดไป',
    });
  }
}
