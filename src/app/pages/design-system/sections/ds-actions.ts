import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { HlmKbdImports } from '@spartan-ng/helm/kbd';
import { HlmSpinner } from '@spartan-ng/helm/spinner';
import { HlmToggleImports } from '@spartan-ng/helm/toggle';
import { HlmToggleGroupImports } from '@spartan-ng/helm/toggle-group';
import { StatusChip } from '../../../shared/components/status-chip/status-chip';
import {
  FilterChips,
  type FilterChipItem,
} from '../../../shared/components/filter-chips/filter-chips';
import { DsPreview } from '../components/ds-preview';
import { DsSection } from '../components/ds-section';

const STATUSES = [
  'pending',
  'in-transit',
  'delivered',
  'cancelled',
  'credit',
  'damaged',
  'active',
  'paused',
  'neutral',
] as const;

@Component({
  selector: 'app-ds-actions',
  imports: [
    DsSection,
    DsPreview,
    NgIcon,
    HlmBadgeImports,
    HlmButtonImports,
    HlmButtonGroupImports,
    HlmKbdImports,
    HlmSpinner,
    HlmToggleImports,
    HlmToggleGroupImports,
    FilterChips,
    StatusChip,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-ds-section
      id="actions"
      eyebrow="Components"
      title="Actions & Indicators"
      description="ปุ่ม ป้ายสถานะ และตัวเลือกแบบสลับ — ปุ่มหลักมีขนาด ≥48px สำหรับการใช้งานหน้างานของพนักงานส่งน้ำ"
    >
      <app-ds-preview
        title="Button — variants"
        description="default = งานหลัก, outline = งานรอง, secondary = งานรองบนพื้นเทา, ghost = งานไม่เน้น, destructive = ลบ/ยกเลิก, link = ลิงก์ในเนื้อหา"
        code='<button hlmBtn>บันทึก</button>
<button hlmBtn variant="outline">ยกเลิก</button>
<button hlmBtn variant="secondary">สำรอง</button>
<button hlmBtn variant="ghost">ดูเพิ่มเติม</button>
<button hlmBtn variant="destructive">ลบ</button>
<button hlmBtn variant="link">รายละเอียด</button>'
      >
        <button hlmBtn>บันทึกออเดอร์</button>
        <button hlmBtn variant="outline">ยกเลิก</button>
        <button hlmBtn variant="secondary">สำรองข้อมูล</button>
        <button hlmBtn variant="ghost">ดูเพิ่มเติม</button>
        <button hlmBtn variant="destructive">ลบรายการ</button>
        <button hlmBtn variant="link">รายละเอียด</button>
      </app-ds-preview>

      <app-ds-preview title="Button — sizes และไอคอน" description="ขนาด xs → lg และ icon-only">
        <button hlmBtn size="xs">xs</button>
        <button hlmBtn size="sm">sm</button>
        <button hlmBtn>default</button>
        <button hlmBtn size="lg">lg</button>
        <button hlmBtn size="icon" aria-label="เพิ่ม"><ng-icon name="lucidePlus" /></button>
        <button hlmBtn size="icon-sm" aria-label="แก้ไข"><ng-icon name="lucidePencil" /></button>
        <button hlmBtn variant="outline">
          <ng-icon name="lucideUpload" data-icon="inline-start" />
          อัปโหลดสลิป
        </button>
        <button hlmBtn variant="outline">
          ถัดไป
          <ng-icon name="lucideChevronRight" data-icon="inline-end" />
        </button>
      </app-ds-preview>

      <app-ds-preview
        title="Button — states"
        description="disabled / loading ใช้สปินเนอร์แทนไอคอนและปิดการกด"
      >
        <button hlmBtn disabled>ปิดใช้งาน</button>
        <button hlmBtn variant="outline" disabled>ปิดใช้งาน</button>
        <button hlmBtn [disabled]="loading()" (click)="simulateLoad()">
          @if (loading()) {
            <hlm-spinner icon="lucideLoaderCircle" aria-label="กำลังบันทึก" />
            กำลังบันทึก...
          } @else {
            บันทึก
          }
        </button>
      </app-ds-preview>

      <app-ds-preview
        title="Driver action buttons (mobile)"
        description='ปุ่มใหญ่ ≥48px สำหรับหน้าจอพนักงานส่งน้ำ ใช้ class="h-12" ทับขนาดเดิม'
        code='&lt;button hlmBtn class="h-12 w-full text-body"&gt;
  &lt;ng-icon name="lucideCircleCheck" data-icon="inline-start" /&gt;
  ส่งน้ำสำเร็จ
&lt;/button&gt;'
      >
        <div class="grid w-full grid-cols-1 gap-2 sm:grid-cols-3">
          <button hlmBtn class="h-12 w-full gap-2 text-body">
            <ng-icon name="lucideCircleCheck" data-icon="inline-start" />
            ส่งน้ำสำเร็จ
          </button>
          <button hlmBtn variant="outline" class="h-12 w-full gap-2 text-body">
            <ng-icon name="lucideDroplet" data-icon="inline-start" />
            รับคืนถังเปล่า
          </button>
          <button hlmBtn variant="secondary" class="h-12 w-full gap-2 text-body">
            <ng-icon name="lucideBanknote" data-icon="inline-start" />
            รับเงิน / สลิป
          </button>
        </div>
      </app-ds-preview>

      <app-ds-preview title="Button group" description="รวมปุ่มที่เกี่ยวข้องกันเป็นกลุ่มเดียว">
        <div hlmButtonGroup>
          <button hlmBtn variant="outline">
            <ng-icon name="lucideChevronLeft" data-icon="inline-start" />
            ก่อนหน้า
          </button>
          <button hlmBtn variant="outline">วันนี้</button>
          <button hlmBtn variant="outline">
            ถัดไป
            <ng-icon name="lucideChevronRight" data-icon="inline-end" />
          </button>
        </div>
      </app-ds-preview>

      <app-ds-preview
        title="Status chip (domain)"
        description="map สีตามสถานะออเดอร์/การเงินอัตโนมัติ — ใช้ app-status-chip"
        code='&lt;app-status-chip status="in-transit" /&gt;'
      >
        <div class="flex flex-wrap items-center gap-2">
          @for (s of statuses; track s) {
            <app-status-chip [status]="s" />
          }
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <app-status-chip status="delivered" [showDot]="false" />
          <app-status-chip status="pending" label="รอตรวจสลิป" />
        </div>
      </app-ds-preview>

      <app-ds-preview
        title="Filter chips"
        description="ชิปตัวกรองสำหรับตาราง/รายการ พร้อมจำนวนนับ — ใช้ app-filter-chips"
        code='&lt;app-filter-chips [items]="filters" [(value)]="filter" /&gt;'
      >
        <div class="flex w-full flex-col gap-3">
          <app-filter-chips [items]="statusFilters" [(value)]="statusFilter" />
          <p class="text-caption text-muted-foreground">
            เลือกอยู่: <span class="font-medium">{{ statusFilter }}</span>
          </p>
        </div>
      </app-ds-preview>

      <app-ds-preview title="Badge" [padded]="true">
        <div class="flex flex-wrap items-center gap-2">
          <span hlmBadge>จำนวน</span>
          <span hlmBadge variant="secondary">563</span>
          <span hlmBadge variant="outline">โซน A</span>
          <span hlmBadge variant="destructive">ถังชำรุด 3</span>
          <span hlmBadge variant="ghost">ฉบับร่าง</span>
          <span hlmBadge variant="link">ดูทั้งหมด</span>
        </div>
      </app-ds-preview>

      <app-ds-preview
        title="Toggle & Toggle group"
        description="ตัวเลือกเปิด/ปิดแบบติดค้าง และกลุ่มตัวเลือก"
      >
        <button hlmToggle aria-label="ตัวหนา"><ng-icon name="lucidePackage" /></button>
        <button hlmToggle variant="outline" [state]="'on'">เปิดใช้งาน</button>

        <div hlmToggleGroup type="single" [value]="'day'" aria-label="มุมมอง">
          <button hlmToggleGroupItem value="day">รายวัน</button>
          <button hlmToggleGroupItem value="week">รายสัปดาห์</button>
          <button hlmToggleGroupItem value="month">รายเดือน</button>
        </div>
      </app-ds-preview>

      <app-ds-preview title="Keyboard hints" [padded]="true">
        <div class="flex flex-wrap items-center gap-4">
          <span class="text-body-sm text-muted-foreground flex items-center gap-1.5">
            ค้นหาเร็ว <kbd hlmKbd>Ctrl</kbd> <kbd hlmKbd>K</kbd>
          </span>
          <span class="text-body-sm text-muted-foreground flex items-center gap-1.5">
            บันทึก <kbd hlmKbd>⌘</kbd> <kbd hlmKbd>S</kbd>
          </span>
        </div>
      </app-ds-preview>
    </app-ds-section>
  `,
})
export class DsActions {
  protected readonly statuses = STATUSES;
  protected readonly loading = signal(false);

  protected readonly statusFilters: readonly FilterChipItem[] = [
    { value: 'all', label: 'ทั้งหมด', count: 146 },
    { value: 'pending', label: 'รอดำเนินการ', count: 12 },
    { value: 'in-transit', label: 'ระหว่างขนส่ง', count: 36 },
    { value: 'delivered', label: 'จัดส่งแล้ว', count: 98 },
  ];

  protected readonly statusFilter = 'all';

  protected simulateLoad(): void {
    this.loading.set(true);
    setTimeout(() => this.loading.set(false), 1800);
  }
}
