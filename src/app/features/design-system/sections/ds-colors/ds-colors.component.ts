import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DsPreview } from '../../components/ds-preview/ds-preview.component';
import { DsSection } from '../../components/ds-section/ds-section.component';
import { DsSwatch } from '../../components/ds-swatch/ds-swatch.component';

const brand = [
  { step: '50', value: '#F0F9FF', cls: 'bg-brand-50' },
  { step: '100', value: '#E0F2FE', cls: 'bg-brand-100' },
  { step: '200', value: '#BAE6FD', cls: 'bg-brand-200' },
  { step: '300', value: '#7DD3FC', cls: 'bg-brand-300' },
  { step: '400', value: '#38BDF8', cls: 'bg-brand-400' },
  { step: '500', value: '#0EA5E9', cls: 'bg-brand-500' },
  { step: '600', value: '#0284C7', cls: 'bg-brand-600' },
  { step: '700', value: '#0369A1', cls: 'bg-brand-700' },
  { step: '800', value: '#075985', cls: 'bg-brand-800' },
  { step: '900', value: '#0C4A6E', cls: 'bg-brand-900' },
  { step: '950', value: '#082F49', cls: 'bg-brand-950' },
];

const teal = [
  { step: '50', value: '#F0FDFA', cls: 'bg-brand-teal-50' },
  { step: '100', value: '#CCFBF1', cls: 'bg-brand-teal-100' },
  { step: '200', value: '#99F6E4', cls: 'bg-brand-teal-200' },
  { step: '300', value: '#5EEAD4', cls: 'bg-brand-teal-300' },
  { step: '400', value: '#2DD4BF', cls: 'bg-brand-teal-400' },
  { step: '500', value: '#14B8A6', cls: 'bg-brand-teal-500' },
  { step: '600', value: '#0D9488', cls: 'bg-brand-teal-600' },
  { step: '700', value: '#0F766E', cls: 'bg-brand-teal-700' },
  { step: '800', value: '#115E59', cls: 'bg-brand-teal-800' },
  { step: '900', value: '#134E4A', cls: 'bg-brand-teal-900' },
];

const amber = [
  { step: '50', value: '#FFFBEB', cls: 'bg-brand-amber-50' },
  { step: '100', value: '#FEF3C7', cls: 'bg-brand-amber-100' },
  { step: '200', value: '#FDE68A', cls: 'bg-brand-amber-200' },
  { step: '300', value: '#FCD34D', cls: 'bg-brand-amber-300' },
  { step: '400', value: '#FBBF24', cls: 'bg-brand-amber-400' },
  { step: '500', value: '#F59E0B', cls: 'bg-brand-amber-500' },
  { step: '600', value: '#D97706', cls: 'bg-brand-amber-600' },
  { step: '700', value: '#B45309', cls: 'bg-brand-amber-700' },
  { step: '800', value: '#92400E', cls: 'bg-brand-amber-800' },
  { step: '900', value: '#78350F', cls: 'bg-brand-amber-900' },
];

const neutral = [
  { step: '50', value: '#F8FAFC', cls: 'bg-neutral-50' },
  { step: '100', value: '#F1F5F9', cls: 'bg-neutral-100' },
  { step: '200', value: '#E2E8F0', cls: 'bg-neutral-200' },
  { step: '300', value: '#CBD5E1', cls: 'bg-neutral-300' },
  { step: '400', value: '#94A3B8', cls: 'bg-neutral-400' },
  { step: '500', value: '#64748B', cls: 'bg-neutral-500' },
  { step: '600', value: '#475569', cls: 'bg-neutral-600' },
  { step: '700', value: '#334155', cls: 'bg-neutral-700' },
  { step: '800', value: '#1E293B', cls: 'bg-neutral-800' },
  { step: '900', value: '#0F172A', cls: 'bg-neutral-900' },
  { step: '950', value: '#020617', cls: 'bg-neutral-950' },
];

const semantic = [
  { name: 'success', value: '#059669', cls: 'bg-success', usage: 'ส่งสำเร็จ / ใช้งาน' },
  { name: 'info', value: '#0284C7', cls: 'bg-info', usage: 'ข้อมูล / กำลังส่ง' },
  { name: 'warning', value: '#F59E0B', cls: 'bg-warning', usage: 'รอดำเนินการ / เตือน' },
  { name: 'danger', value: '#DC2626', cls: 'bg-danger', usage: 'ยกเลิก / ผิดพลาด' },
  { name: 'credit', value: '#EA580C', cls: 'bg-credit', usage: 'ค้างชำระ / เครดิต' },
  { name: 'primary', value: '#0284C7', cls: 'bg-primary', usage: 'ปุ่มหลัก / ลิงก์' },
  { name: 'secondary', value: '#F1F5F9', cls: 'bg-secondary', usage: 'พื้นรอง / ปุ่มรอง' },
  { name: 'muted', value: '#F1F5F9', cls: 'bg-muted', usage: 'พื้นที่ไม่เน้น' },
  { name: 'accent', value: '#F0F9FF', cls: 'bg-accent', usage: 'hover / active' },
  { name: 'destructive', value: '#DC2626', cls: 'bg-destructive', usage: 'ปุ่มลบ' },
  { name: 'border', value: '#E2E8F0', cls: 'bg-border', usage: 'เส้นขอบ' },
  { name: 'ring', value: '#0EA5E9', cls: 'bg-ring', usage: 'โฟกัสริง' },
];

const statusTokens = [
  { name: 'status-pending', value: '#F59E0B', cls: 'bg-status-pending', usage: 'รอดำเนินการ' },
  { name: 'status-in-transit', value: '#0284C7', cls: 'bg-status-in-transit', usage: 'กำลังส่ง' },
  { name: 'status-delivered', value: '#059669', cls: 'bg-status-delivered', usage: 'ส่งสำเร็จ' },
  { name: 'status-cancelled', value: '#DC2626', cls: 'bg-status-cancelled', usage: 'ยกเลิก' },
  { name: 'status-credit', value: '#EA580C', cls: 'bg-status-credit', usage: 'ค้างชำระ' },
];

const softPairs = [
  {
    name: 'success-soft',
    bg: 'bg-success-soft',
    fg: 'text-success-soft-foreground',
    border: 'border-success-border',
  },
  {
    name: 'info-soft',
    bg: 'bg-info-soft',
    fg: 'text-info-soft-foreground',
    border: 'border-info-border',
  },
  {
    name: 'warning-soft',
    bg: 'bg-warning-soft',
    fg: 'text-warning-soft-foreground',
    border: 'border-warning-border',
  },
  {
    name: 'danger-soft',
    bg: 'bg-danger-soft',
    fg: 'text-danger-soft-foreground',
    border: 'border-danger-border',
  },
  {
    name: 'credit-soft',
    bg: 'bg-credit-soft',
    fg: 'text-credit-soft-foreground',
    border: 'border-credit-border',
  },
];

const charts = [
  { name: 'chart-1', cls: 'bg-chart-1' },
  { name: 'chart-2', cls: 'bg-chart-2' },
  { name: 'chart-3', cls: 'bg-chart-3' },
  { name: 'chart-4', cls: 'bg-chart-4' },
  { name: 'chart-5', cls: 'bg-chart-5' },
];

@Component({
  selector: 'app-ds-colors',
  imports: [DsSection, DsPreview, DsSwatch],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ds-colors.component.html',
  styleUrl: './ds-colors.component.scss',
})
export class DsColors {
  protected readonly brand = brand;
  protected readonly teal = teal;
  protected readonly amber = amber;
  protected readonly neutral = neutral;
  protected readonly semantic = semantic;
  protected readonly statusTokens = statusTokens;
  protected readonly softPairs = softPairs;
  protected readonly charts = charts;
}
