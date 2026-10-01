import { hlm } from '@spartan-ng/helm/utils';

/**
 * Regression: tailwind-merge ต้องรู้จักสเกลฟอนต์ของโปรเจค (text-label, text-caption, ...)
 * ไม่เช่นนั้นจะมองเป็นกลุ่มสีตัวอักษร แล้วตัดคลาสสีจริงทิ้ง
 * (เคสจริง: ปุ่ม payment mode selector ที่เลือก มี bg-primary แต่ข้อความกลายเป็นสีดำ)
 */
describe('hlm class merge', () => {
  it('keeps color class together with custom text scale (payment mode selector)', () => {
    const merged = hlm(
      'bg-primary text-primary-foreground',
      'h-auto w-full py-2.5 text-label whitespace-normal',
    );

    expect(merged).toContain('bg-primary');
    expect(merged).toContain('text-primary-foreground');
    expect(merged).toContain('text-label');
  });

  it('keeps chip color class together with text-caption / text-h3', () => {
    expect(hlm('text-caption font-medium', 'bg-brand-50 text-brand-700')).toBe(
      'text-caption font-medium bg-brand-50 text-brand-700',
    );
    expect(hlm('text-h3 tabular-nums', 'text-danger-soft-foreground')).toContain('text-h3');
  });

  it('still lets a later font-size win over an earlier one', () => {
    expect(hlm('text-label', 'text-sm')).toBe('text-sm');
  });
});
