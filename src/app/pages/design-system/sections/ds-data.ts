import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmPaginationImports } from '@spartan-ng/helm/pagination';
import { HlmSkeleton } from '@spartan-ng/helm/skeleton';
import { HlmSpinner } from '@spartan-ng/helm/spinner';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { BottleCount } from '../../../shared/components/bottle-count/bottle-count';
import { KpiCard } from '../../../shared/components/kpi-card/kpi-card';
import { PaymentChip } from '../../../shared/components/payment-chip/payment-chip';
import { ProgressBar } from '../../../shared/components/progress-bar/progress-bar';
import { RouteProgressRow } from '../../../shared/components/route-progress-row/route-progress-row';
import { RouteStatusCard } from '../../../shared/components/route-status-card/route-status-card';
import { StatusChip } from '../../../shared/components/status-chip/status-chip';
import { ThaiDatePipe } from '../../../shared/pipes/thai-date.pipe';
import { ThbPipe } from '../../../shared/pipes/thb.pipe';
import { type ChipStatus } from '../../../shared/models/domain';
import { DsPreview } from '../components/ds-preview';
import { DsSection } from '../components/ds-section';

interface OrderRow {
  readonly id: string;
  readonly customer: string;
  readonly address: string;
  readonly bottles: number;
  readonly returned: number;
  readonly amount: number;
  readonly status: ChipStatus;
  readonly date: string;
}

@Component({
  selector: 'app-ds-data',
  imports: [
    DsSection,
    DsPreview,
    NgIcon,
    HlmAvatarImports,
    HlmBadgeImports,
    HlmButtonImports,
    HlmCardImports,
    HlmCheckboxImports,
    HlmEmptyImports,
    HlmItemImports,
    HlmPaginationImports,
    HlmSkeleton,
    HlmSpinner,
    HlmTableImports,
    BottleCount,
    KpiCard,
    PaymentChip,
    ProgressBar,
    RouteProgressRow,
    RouteStatusCard,
    StatusChip,
    ThaiDatePipe,
    ThbPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-ds-section
      id="data"
      eyebrow="Components"
      title="Data Display"
      description="การ์ดสรุป ตาราง และองค์ประกอบแสดงข้อมูล พร้อมข้อกำหนดการแสดงวันที่/เงิน/จำนวนถังของระบบ"
    >
      <app-ds-preview
        title="KPI summary card (domain)"
        description="การ์ดตัวเลขพร้อมไอคอนและ delta — พื้นการ์ดเป็นสีขาวเสมอ สีของ tone จะอยู่ที่กล่องไอคอนและแถบ accent ด้านล่างเท่านั้น (ตามสเปก Stitch)"
        [padded]="true"
        code='&lt;app-kpi-card label="ยอดส่งวันนี้" value="1,248" unit="ถัง"
  icon="lucideDroplet" tone="brand" [delta]="12.5" hint="เทียบเมื่อวาน" /&gt;

&lt;!-- ยอดที่ต้องเฝ้าระวัง: ระบายสีตัวเลขด้วย --&gt;
&lt;app-kpi-card label="ยอดค้างชำระ" value="฿186,400"
  icon="lucideWallet" tone="credit" [valueAccent]="true" /&gt;'
      >
        <div class="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <app-kpi-card
            label="ยอดส่งวันนี้"
            value="1,248"
            unit="ถัง"
            icon="lucideDroplet"
            tone="brand"
            [delta]="12.5"
            hint="เทียบเมื่อวาน"
          />
          <app-kpi-card
            label="ระหว่างขนส่ง"
            value="1,120"
            unit="ถัง"
            icon="lucideTruck"
            tone="teal"
            hint="บนรถ 3 คัน"
          />
          <app-kpi-card
            label="ออเดอร์ประจำวัน"
            value="146"
            unit="รายการ"
            icon="lucideBoxes"
            tone="violet"
            hint="รอ 12 รายการ"
          />
          <app-kpi-card
            label="งานเสร็จสิ้น"
            value="42 / 48"
            unit="จุด"
            icon="lucideRoute"
            tone="success"
            [delta]="0"
            hint="อัปเดตล่าสุด 10 นาที"
          />
          <app-kpi-card
            label="ยอดค้างชำระ"
            value="฿186,400"
            icon="lucideWallet"
            tone="credit"
            [valueAccent]="true"
            hint="24 ราย · เกินกำหนด 6 ราย"
          />
        </div>
      </app-ds-preview>

      <app-ds-preview
        title="Route progress row (domain)"
        description="แถวสถานะรถส่งน้ำแบบกะทัดรัดสำหรับวางเรียงในรายการ/แดชบอร์ด — ใช้ app-route-progress-row"
        [padded]="true"
        code='&lt;app-route-progress-row truckNo="1" title="สายที่ 1: ทะเบียน 1ฒข-4521"
  driverName="นิคม แสนสุข" driverPhone="081-456-7890"
  status="in-transit" statusLabel="กำลังส่งจุดที่ 8"
  [bottleDelivered]="44" [bottleLoaded]="50" [deliveredStops]="14"
  [emptyReturned]="41" eta="15:45 น." /&gt;'
      >
        <div class="flex w-full flex-col gap-4">
          <app-route-progress-row
            truckNo="1"
            title="สายที่ 1: ทะเบียน 1ฒข-4521"
            driverName="นิคม แสนสุข"
            driverPhone="081-456-7890"
            status="in-transit"
            statusLabel="กำลังส่งจุดที่ 8"
            [bottleDelivered]="44"
            [bottleLoaded]="50"
            [deliveredStops]="14"
            [emptyReturned]="41"
            eta="15:45 น."
          />
          <app-route-progress-row
            truckNo="3"
            title="สายที่ 3: ทะเบียน 3ฒฉ-1204"
            driverName="วรวิทย์ เกตุแก้ว"
            driverPhone="086-778-3412"
            status="delivered"
            statusLabel="ใกล้เสร็จสิ้น"
            badgeTone="teal"
            progressTone="teal"
            [bottleDelivered]="36"
            [bottleLoaded]="40"
            [deliveredStops]="11"
            [emptyReturned]="35"
            eta="15:10 น."
          />
        </div>
      </app-ds-preview>

      <app-ds-preview
        title="Route status card (domain)"
        description="การ์ดสถานะสายรถส่งน้ำแบบเต็มใบ สำหรับวางใน grid"
        [padded]="true"
      >
        <div class="grid w-full gap-4 lg:grid-cols-3">
          <app-route-status-card
            truckName="รถคันที่ 1"
            zone="โซน A — ตัวเมือง"
            driverName="สมหมาย ขับดี"
            status="in-transit"
            [deliveredCount]="9"
            [totalCount]="12"
            [bottleCount]="240"
          />
          <app-route-status-card
            truckName="รถคันที่ 2"
            zone="โซน B — ตลาด"
            driverName="วิชัย เร็วดี"
            status="delivered"
            [deliveredCount]="14"
            [totalCount]="14"
            [bottleCount]="320"
          />
          <app-route-status-card
            truckName="รถคันที่ 3"
            zone="โซน C — ต่างอำเภอ"
            driverName="ประเสริฐ ทางไกล"
            status="pending"
            [deliveredCount]="0"
            [totalCount]="8"
            [bottleCount]="160"
          />
        </div>
      </app-ds-preview>

      <app-ds-preview
        title="Data table"
        description="ตารางข้อมูลหนาแน่น — zebra row, sticky header, checkbox เลือกแถว และตัวเลขแบบ tabular-nums"
        [padded]="false"
        code='&lt;div hlmTableContainer&gt;
  &lt;table hlmTable&gt;
    &lt;thead hlmTHead class="sticky top-0 z-10 bg-background"&gt;...&lt;/thead&gt;
    &lt;tbody hlmTBody&gt;...&lt;/tbody&gt;
  &lt;/table&gt;
&lt;/div&gt;'
      >
        <div class="flex w-full flex-col">
          <div class="flex flex-wrap items-center gap-2 border-b p-3">
            <div class="text-body-sm font-medium">ออเดอร์วันนี้</div>
            <span hlmBadge variant="secondary" class="ms-1">6 รายการ</span>
            <div class="ms-auto flex items-center gap-2">
              <button hlmBtn variant="outline" size="sm">
                <ng-icon name="lucideFilter" data-icon="inline-start" />
                ตัวกรอง
              </button>
              <button hlmBtn size="sm">
                <ng-icon name="lucidePlus" data-icon="inline-start" />
                เพิ่มออเดอร์
              </button>
            </div>
          </div>

          <div hlmTableContainer class="thin-scrollbar max-h-96">
            <table hlmTable>
              <thead hlmTHead class="bg-background sticky top-0 z-10">
                <tr hlmTr class="hover:bg-transparent">
                  <th hlmTh class="w-10">
                    <hlm-checkbox aria-label="เลือกทั้งหมด" />
                  </th>
                  <th hlmTh>ลูกค้า / ที่อยู่</th>
                  <th hlmTh class="text-end">ส่ง (ถัง)</th>
                  <th hlmTh class="text-end">คืนถัง</th>
                  <th hlmTh class="text-end">ยอดเงิน</th>
                  <th hlmTh>สถานะ</th>
                  <th hlmTh>วันที่</th>
                  <th hlmTh class="w-12"></th>
                </tr>
              </thead>
              <tbody hlmTBody>
                @for (row of orders; track row.id; let odd = $odd) {
                  <tr hlmTr [class.bg-muted/30]="odd">
                    <td hlmTd>
                      <hlm-checkbox [aria-label]="'เลือก ' + row.customer" />
                    </td>
                    <td hlmTd>
                      <div class="flex flex-col">
                        <span class="text-body-sm font-medium">{{ row.customer }}</span>
                        <span class="text-caption text-muted-foreground">{{ row.address }}</span>
                      </div>
                    </td>
                    <td hlmTd class="text-end">
                      <app-bottle-count
                        [value]="row.bottles"
                        size="sm"
                        tone="brand"
                        [emphasis]="'strong'"
                      />
                    </td>
                    <td hlmTd class="text-end">
                      <app-bottle-count
                        [value]="row.returned"
                        size="sm"
                        tone="muted"
                        [signed]="true"
                      />
                    </td>
                    <td hlmTd class="text-end tabular-nums" data-numeric>{{ row.amount | thb }}</td>
                    <td hlmTd><app-status-chip [status]="row.status" /></td>
                    <td hlmTd class="text-caption text-muted-foreground">
                      {{ row.date | thaiDate }}
                    </td>
                    <td hlmTd>
                      <button hlmBtn variant="ghost" size="icon-sm" aria-label="ตัวเลือกเพิ่มเติม">
                        <ng-icon name="lucideEllipsis" />
                      </button>
                    </td>
                  </tr>
                }
              </tbody>
              <tfoot hlmTFoot>
                <tr hlmTr class="hover:bg-transparent">
                  <td hlmTd colspan="2" class="text-body-sm font-medium">รวม</td>
                  <td hlmTd class="text-end font-semibold tabular-nums" data-numeric>1,248</td>
                  <td hlmTd class="text-end font-semibold tabular-nums" data-numeric>+312</td>
                  <td hlmTd class="text-end font-semibold tabular-nums" data-numeric>฿42,860.00</td>
                  <td hlmTd colspan="3"></td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div class="border-t p-3">
            <hlm-pagination aria-label="แบ่งหน้า">
              <ul hlmPaginationContent>
                <li hlmPaginationItem>
                  <hlm-pagination-previous />
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
                  <hlm-pagination-next />
                </li>
              </ul>
            </hlm-pagination>
          </div>
        </div>
      </app-ds-preview>

      <app-ds-preview title="Card" description="การ์ดพื้นฐานสำหรับจัดกลุ่มเนื้อหา" [padded]="true">
        <div hlmCard class="w-full max-w-sm">
          <div hlmCardHeader>
            <h3 hlmCardTitle>สรุปสต็อกโรงงาน</h3>
            <p hlmCardDescription>อัปเดตล่าสุด 5 นาทีที่แล้ว</p>
          </div>
          <div hlmCardContent class="flex flex-col gap-3">
            <app-bottle-count
              [value]="842"
              label="ถังพร้อมส่ง"
              size="lg"
              tone="brand"
              emphasis="strong"
            />
            <div class="flex flex-wrap gap-2">
              <app-bottle-count
                [value]="36"
                label="ถังชำรุด"
                size="sm"
                tone="danger"
                emphasis="badge"
              />
              <app-bottle-count
                [value]="120"
                label="ถังบนรถ"
                size="sm"
                tone="muted"
                emphasis="badge"
              />
            </div>
          </div>
          <div hlmCardFooter class="gap-2">
            <button hlmBtn size="sm">ตัดสต็อก</button>
            <button hlmBtn size="sm" variant="outline">ดูประวัติ</button>
          </div>
        </div>
      </app-ds-preview>

      <app-ds-preview
        title="Progress, Skeleton, Spinner"
        description="แถบความคืบหน้าใช้ app-progress-bar (ครอบ hlm-progress + indicator ให้แล้ว) เลือกสีได้ด้วย tone"
      >
        <div class="grid w-full gap-6 lg:grid-cols-2">
          <div class="flex flex-col gap-3">
            <div class="flex items-center justify-between text-body-sm">
              <span>ความคืบหน้าการส่ง</span>
              <span class="tabular-nums font-medium" data-numeric>62%</span>
            </div>
            <app-progress-bar [value]="62" tone="brand" />
            <div class="flex flex-wrap items-center gap-2 pt-1">
              @for (tone of progressTones; track tone) {
                <span class="flex w-28 flex-col gap-1.5">
                  <app-progress-bar [value]="45 + $index * 10" [tone]="tone" size="sm" />
                  <span class="text-caption text-muted-foreground font-mono">{{ tone }}</span>
                </span>
              }
            </div>
            <app-progress-bar [value]="null" tone="brand" />
          </div>
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-3">
              <hlm-spinner aria-label="กำลังโหลด" />
              <span class="text-body-sm text-muted-foreground">กำลังโหลดข้อมูล...</span>
            </div>
            <div class="flex flex-col gap-2">
              <hlm-skeleton class="h-4 w-3/4" />
              <hlm-skeleton class="h-4 w-1/2" />
              <hlm-skeleton class="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </app-ds-preview>

      <app-ds-preview title="Avatar & Item" description="ข้อมูลผู้ใช้/คนขับ และรายการแบบมีสื่อ">
        <div class="flex w-full flex-col gap-6">
          <div class="flex flex-wrap items-center gap-4">
            <hlm-avatar class="size-10">
              <span hlmAvatarFallback class="bg-brand-100 text-brand-700">สบ</span>
            </hlm-avatar>
            <hlm-avatar class="size-10">
              <span hlmAvatarFallback class="bg-success-soft text-success-soft-foreground">วช</span>
            </hlm-avatar>
            <div hlmAvatarGroup>
              <hlm-avatar>
                <span hlmAvatarFallback>ก</span>
              </hlm-avatar>
              <hlm-avatar>
                <span hlmAvatarFallback>ข</span>
              </hlm-avatar>
              <hlm-avatar>
                <span hlmAvatarFallback>ค</span>
              </hlm-avatar>
              <span hlmAvatarGroupCount>+5</span>
            </div>
          </div>

          <div hlmItem class="w-full max-w-md bg-card">
            <div hlmItemMedia variant="icon" class="bg-brand-50 text-brand-700">
              <ng-icon name="lucideMapPin" />
            </div>
            <div hlmItemContent>
              <div hlmItemTitle>บ้านคุณสมศรี</div>
              <p hlmItemDescription>121/4 หมู่ 3 ต.บางทราย · โซน A</p>
            </div>
            <div hlmItemActions>
              <button hlmBtn size="sm" variant="outline">นำทาง</button>
            </div>
          </div>
        </div>
      </app-ds-preview>

      <app-ds-preview title="Empty state" description="แสดงเมื่อไม่มีข้อมูล พร้อมปุ่ม action">
        <div class="w-full">
          <hlm-empty class="border border-dashed">
            <div hlmEmptyHeader>
              <div hlmEmptyMedia variant="icon">
                <ng-icon name="lucideDroplet" />
              </div>
              <div hlmEmptyTitle>ยังไม่มีออเดอร์วันนี้</div>
              <p hlmEmptyDescription>
                เริ่มสร้างออเดอร์แรก หรือรอออเดอร์จากลูกค้าเข้าระบบเพื่อจัดสายรถส่งน้ำ
              </p>
            </div>
            <div hlmEmptyContent>
              <button hlmBtn>
                <ng-icon name="lucidePlus" data-icon="inline-start" />
                สร้างออเดอร์
              </button>
            </div>
          </hlm-empty>
        </div>
      </app-ds-preview>

      <app-ds-preview
        title="Payment chip (domain)"
        description="ป้ายวิธีชำระเงินแบบอ่านอย่างเดียว ใช้ในตารางออเดอร์/ใบเสร็จ — สี map ตามโหมดชำระ"
        [padded]="true"
        code='&lt;app-payment-chip mode="credit" label="เครดิต 30 วัน" /&gt;'
      >
        <div class="flex w-full flex-wrap items-center gap-2">
          <app-payment-chip mode="cash" label="เงินสดปลายทาง" />
          <app-payment-chip mode="slip" />
          <app-payment-chip mode="coupon" label="คูปอง (60 ใบ)" />
          <app-payment-chip mode="credit" label="เครดิต 30 วัน" />
          <app-payment-chip mode="slip" label="ไม่แสดงไอคอน" [showIcon]="false" />
        </div>
      </app-ds-preview>

      <app-ds-preview
        title="Data conventions"
        description="รูปแบบการแสดงผลข้อมูลที่ใช้เหมือนกันทั้งระบบ"
        [padded]="true"
      >
        <div class="grid w-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div class="bg-muted/40 rounded-lg border p-3">
            <div class="text-caption text-muted-foreground">วันที่และเวลาแบบไทย</div>
            <div class="text-h4">{{ today | thaiDate }}</div>
            <code class="text-caption text-muted-foreground"
              >{{ '{{ value | thaiDateTime }}' }}</code
            >
          </div>
          <div class="bg-muted/40 rounded-lg border p-3">
            <div class="text-caption text-muted-foreground">สกุลเงินบาท</div>
            <div class="text-h4 tabular-nums" data-numeric>{{ 42860 | thb }}</div>
            <code class="text-caption text-muted-foreground">{{ '{{ value | thb }}' }}</code>
          </div>
          <div class="bg-muted/40 rounded-lg border p-3">
            <div class="text-caption text-muted-foreground">จำนวนถัง</div>
            <div class="text-h4">
              <app-bottle-count [value]="1248" size="lg" />
            </div>
            <code class="text-caption text-muted-foreground">app-bottle-count</code>
          </div>
          <div class="bg-muted/40 rounded-lg border p-3">
            <div class="text-caption text-muted-foreground">ตัวเลขในตาราง</div>
            <div class="text-h4 tabular-nums" data-numeric>1,248.00</div>
            <code class="text-caption text-muted-foreground">tabular-nums + data-numeric</code>
          </div>
        </div>
      </app-ds-preview>
    </app-ds-section>
  `,
})
export class DsData {
  protected readonly today = new Date();

  protected readonly progressTones = ['brand', 'teal', 'success', 'warning', 'credit'] as const;

  protected readonly orders: readonly OrderRow[] = [
    {
      id: 'ORD-6901',
      customer: 'บ้านคุณสมศรี',
      address: '121/4 หมู่ 3 ต.บางทราย',
      bottles: 24,
      returned: 18,
      amount: 3480,
      status: 'delivered',
      date: '2026-09-17T08:12:00',
    },
    {
      id: 'ORD-6902',
      customer: 'ร้านอาหารครัวไทย',
      address: '88 ถ.สุขุมวิท',
      bottles: 120,
      returned: 96,
      amount: 17400,
      status: 'in-transit',
      date: '2026-09-17T09:05:00',
    },
    {
      id: 'ORD-6903',
      customer: 'ร้านกาแฟบ้านสวน',
      address: '45/2 ต.ในเมือง',
      bottles: 36,
      returned: 0,
      amount: 0,
      status: 'credit',
      date: '2026-09-17T09:40:00',
    },
    {
      id: 'ORD-6904',
      customer: 'อพาร์ทเมนต์สุขใจ',
      address: '9 ซ.5 ต.หนองปรือ',
      bottles: 60,
      returned: 60,
      amount: 8700,
      status: 'pending',
      date: '2026-09-17T10:20:00',
    },
    {
      id: 'ORD-6905',
      customer: 'ร้านข้าวแกงป้าแดง',
      address: '3 ต.ท่าศาลา',
      bottles: 12,
      returned: 8,
      amount: 1740,
      status: 'cancelled',
      date: '2026-09-17T11:02:00',
    },
    {
      id: 'ORD-6906',
      customer: 'บริษัท ก่อสร้างรุ่งเรือง',
      address: '99 แขวงบางนา',
      bottles: 240,
      returned: 200,
      amount: 32000,
      status: 'delivered',
      date: '2026-09-17T13:15:00',
    },
  ];
}
