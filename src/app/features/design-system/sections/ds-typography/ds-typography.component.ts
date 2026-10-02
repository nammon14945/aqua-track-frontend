import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { DsPreview } from '../../components/ds-preview/ds-preview.component';
import { DsSection } from '../../components/ds-section/ds-section.component';

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
  templateUrl: './ds-typography.component.html',
  styleUrl: './ds-typography.component.scss',
})
export class DsTypography {
  protected readonly typeScale = typeScale;
  protected readonly spacing = spacing;
  protected readonly radii = radii;
  protected readonly shadows = shadows;
  protected readonly icons = icons;
}
