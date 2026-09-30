import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { DsPreview } from '../components/ds-preview';
import { DsSection } from '../components/ds-section';

const typeScale = [
  {
    token: 'text-display',
    cls: 'text-display',
    label: 'Display',
    usage: 'ตัวเลข KPI หลัก / hero',
    size: '36px / 44px · 700',
  },
  {
    token: 'text-h1',
    cls: 'text-h1',
    label: 'Heading 1',
    usage: 'หัวหน้าเพจ',
    size: '30px / 38px · 700',
  },
  {
    token: 'text-h2',
    cls: 'text-h2',
    label: 'Heading 2',
    usage: 'หัวข้อ section',
    size: '24px / 32px · 600',
  },
  {
    token: 'text-h3',
    cls: 'text-h3',
    label: 'Heading 3',
    usage: 'หัวการ์ด',
    size: '20px / 28px · 600',
  },
  {
    token: 'text-h4',
    cls: 'text-h4',
    label: 'Heading 4',
    usage: 'หัวข้อย่อย',
    size: '18px / 26px · 600',
  },
  {
    token: 'text-body-lg',
    cls: 'text-body-lg',
    label: 'Body Large',
    usage: 'คำอธิบายนำ',
    size: '16px / 26px',
  },
  {
    token: 'text-body',
    cls: 'text-body',
    label: 'Body',
    usage: 'เนื้อหาทั่วไป / ตาราง',
    size: '14px / 24px',
  },
  {
    token: 'text-body-sm',
    cls: 'text-body-sm',
    label: 'Body Small',
    usage: 'ข้อความรอง',
    size: '13px / 20px',
  },
  {
    token: 'text-caption',
    cls: 'text-caption',
    label: 'Caption',
    usage: 'ป้ายกำกับ / หมายเหตุ',
    size: '12px / 16px',
  },
  {
    token: 'text-label',
    cls: 'text-label',
    label: 'Label',
    usage: 'ปุ่ม / ฟอร์ม',
    size: '13px / 18px · 500',
  },
];

const spacing = [0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10, 12, 16];

const radii = [
  { name: 'rounded-sm', cls: 'rounded-sm', px: '≈5px' },
  { name: 'rounded-md', cls: 'rounded-md', px: '≈6px' },
  { name: 'rounded-lg', cls: 'rounded-lg', px: '8px (base)' },
  { name: 'rounded-xl', cls: 'rounded-xl', px: '≈11px' },
  { name: 'rounded-2xl', cls: 'rounded-2xl', px: '≈14px' },
  { name: 'rounded-full', cls: 'rounded-full', px: 'pill / avatar' },
];

const shadows = [
  { name: 'shadow-soft-xs', cls: 'shadow-soft-xs', usage: 'sep / badge' },
  { name: 'shadow-soft-sm', cls: 'shadow-soft-sm', usage: 'การ์ดเริ่มต้น' },
  { name: 'shadow-soft-md', cls: 'shadow-soft-md', usage: 'การ์ด hover' },
  { name: 'shadow-soft-lg', cls: 'shadow-soft-lg', usage: 'dropdown / popover' },
  { name: 'shadow-soft-xl', cls: 'shadow-soft-xl', usage: 'dialog / drawer' },
];

const icons = [
  'lucideLayoutDashboard',
  'lucideDroplet',
  'lucideTruck',
  'lucideBoxes',
  'lucideTicket',
  'lucideWallet',
  'lucideUsers',
  'lucideMapPin',
  'lucidePhone',
  'lucideCalendarDays',
  'lucideBanknote',
  'lucideReceipt',
  'lucideRoute',
  'lucidePackage',
  'lucideSearch',
  'lucideFilter',
  'lucidePlus',
  'lucidePencil',
  'lucideTrash2',
  'lucideUpload',
  'lucideBell',
  'lucideSettings',
  'lucideCircleCheck',
  'lucideTriangleAlert',
];

@Component({
  selector: 'app-ds-typography',
  imports: [DsSection, DsPreview, NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-ds-section
      id="typography"
      eyebrow="Foundations"
      title="Typography & Shape"
      description="ฟอนต์ Noto Sans Thai เป็นหลัก — ตั้ง line-height 1.6 สำหรับภาษาไทย และใช้ตัวเลขแบบ tabular-nums สำหรับยอดเงิน/จำนวนถัง"
    >
      <app-ds-preview
        title="Type scale"
        description="ทุกสเกลมี token ใน Tailwind: text-display, text-h1 … text-caption, text-label"
      >
        <div class="flex w-full flex-col divide-y">
          @for (t of typeScale; track t.token) {
            <div
              class="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 lg:flex-row lg:items-center lg:gap-6"
            >
              <div class="w-full shrink-0 lg:w-64">
                <div class="text-caption text-muted-foreground font-mono">{{ t.token }}</div>
                <div class="text-caption text-muted-foreground">{{ t.size }}</div>
              </div>
              <div class="min-w-0 flex-1">
                <p [class]="t.cls" class="truncate">ส่งน้ำดื่ม 1,250 ขวด AquaTrack Pro</p>
              </div>
              <div class="text-caption text-muted-foreground lg:w-48 lg:text-end">
                {{ t.usage }}
              </div>
            </div>
          }
        </div>
      </app-ds-preview>

      <app-ds-preview
        title="น้ำหนักฟอนต์ และตัวเลข"
        description="ใช้ tabular-nums กับตัวเลขเพื่อให้คอลัมน์ตรงกันในตาราง"
      >
        <div class="flex w-full flex-col gap-6">
          <div class="flex flex-wrap items-center gap-6">
            <span class="text-h3 font-light">น้ำหนัก 300</span>
            <span class="text-h3 font-normal">น้ำหนัก 400</span>
            <span class="text-h3 font-medium">น้ำหนัก 500</span>
            <span class="text-h3 font-semibold">น้ำหนัก 600</span>
            <span class="text-h3 font-bold">น้ำหนัก 700</span>
          </div>
          <div class="flex flex-wrap items-center gap-8">
            <div class="flex flex-col">
              <span class="text-caption text-muted-foreground">ไม่มี tabular-nums</span>
              <span class="text-h4">฿111,111.00</span>
              <span class="text-h4">฿999,999.00</span>
            </div>
            <div class="flex flex-col" data-numeric>
              <span class="text-caption text-muted-foreground">tabular-nums</span>
              <span class="text-h4 tabular-nums">฿111,111.00</span>
              <span class="text-h4 tabular-nums">฿999,999.00</span>
            </div>
          </div>
        </div>
      </app-ds-preview>

      <app-ds-preview
        title="Spacing scale (base 4px)"
        description="ใช้ utility ของ Tailwind ตามสเกลนี้เท่านั้น เพื่อให้ระยะห่างสม่ำเสมอ"
        [padded]="true"
      >
        <div class="flex w-full flex-col gap-3">
          @for (s of spacing; track s) {
            <div class="flex items-center gap-4">
              <span class="text-caption text-muted-foreground w-16 shrink-0 font-mono">{{
                s
              }}</span>
              <span class="bg-brand-200 h-4 rounded-sm" [style.width.px]="s * 4"></span>
              <span class="text-caption text-muted-foreground">{{ s * 4 }}px</span>
            </div>
          }
        </div>
      </app-ds-preview>

      <app-ds-preview title="Radius" description="ฐาน 8px (ROUND_EIGHT) จาก Stitch" [padded]="true">
        <div class="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          @for (r of radii; track r.name) {
            <div class="flex flex-col items-center gap-2">
              <span [class]="r.cls" class="bg-brand-50 border-brand-300 size-16 border-2"></span>
              <span class="text-caption font-mono">{{ r.name }}</span>
              <span class="text-caption text-muted-foreground">{{ r.px }}</span>
            </div>
          }
        </div>
      </app-ds-preview>

      <app-ds-preview title="Elevation (soft shadows)" [padded]="true">
        <div class="grid w-full grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          @for (s of shadows; track s.name) {
            <div class="flex flex-col items-center gap-3">
              <span [class]="s.cls" class="bg-card size-20 rounded-xl border"></span>
              <span class="text-caption text-center font-mono">{{ s.name }}</span>
              <span class="text-caption text-muted-foreground text-center">{{ s.usage }}</span>
            </div>
          }
        </div>
      </app-ds-preview>

      <app-ds-preview
        title="Iconography — Lucide"
        description='ลงทะเบียนไอคอนที่ใช้จริงไว้ที่ core/icons.ts แล้วเรียกผ่าน <ng-icon name="..." />'
      >
        <div class="grid w-full grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-12">
          @for (i of icons; track i) {
            <div class="flex flex-col items-center gap-2">
              <span
                class="bg-muted text-foreground flex size-10 items-center justify-center rounded-lg [&_ng-icon]:text-[length:--spacing(4)]"
              >
                <ng-icon [name]="i" />
              </span>
              <span
                class="text-caption text-muted-foreground w-full truncate text-center font-mono"
                >{{ i.replace('lucide', '') }}</span
              >
            </div>
          }
        </div>
      </app-ds-preview>
    </app-ds-section>
  `,
})
export class DsTypography {
  protected readonly typeScale = typeScale;
  protected readonly spacing = spacing;
  protected readonly radii = radii;
  protected readonly shadows = shadows;
  protected readonly icons = icons;
}
