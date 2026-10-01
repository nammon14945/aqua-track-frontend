import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { provideSpartanHlm } from '@spartan-ng/helm/utils';
import { ApplicationRef, type Type } from '@angular/core';
import { APP_ICONS } from './core/icons';
import { DesignSystem } from './pages/design-system/design-system';

const setup = async <T>(component: Type<T>): Promise<ComponentFixture<T>> => {
  await TestBed.configureTestingModule({
    imports: [component],
    providers: [
      provideRouter([]),
      provideHttpClient(),
      provideIcons(APP_ICONS),
      provideSpartanHlm(),
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
};

describe('Design system smoke tests', () => {
  it('renders the design system page with every section', async () => {
    const fixture = await setup(DesignSystem);
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('app-ds-colors')).toBeTruthy();
    expect(el.querySelector('app-ds-typography')).toBeTruthy();
    expect(el.querySelector('app-ds-actions')).toBeTruthy();
    expect(el.querySelector('app-ds-forms')).toBeTruthy();
    expect(el.querySelector('app-ds-data')).toBeTruthy();
    expect(el.querySelector('app-ds-navigation')).toBeTruthy();
    expect(el.querySelector('app-ds-feedback')).toBeTruthy();
  });

  it('keeps the selected payment mode button readable (primary bg + light text)', async () => {
    const fixture = await setup(DesignSystem);
    // รอ MutationObserver ของ class manager ใน spartan-ng ทำงานก่อนตรวจคลาสที่ merge แล้ว
    await new Promise((resolve) => setTimeout(resolve));
    fixture.detectChanges();

    const buttons = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
      'app-payment-mode-selector button[role="radio"]',
    );
    expect(buttons.length).toBe(4);

    const selected = Array.from(buttons).find(
      (button) => button.getAttribute('aria-checked') === 'true',
    );
    expect(selected).toBeTruthy();
    expect(selected?.classList.contains('bg-primary')).toBe(true);
    expect(selected?.classList.contains('text-primary-foreground')).toBe(true);
    expect(selected?.classList.contains('text-label')).toBe(true);
  });

  it('opens the dialog service demo as a full card with actions', async () => {
    const fixture = await setup(DesignSystem);

    const trigger = Array.from(
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('button'),
    ).find((button) => button.textContent?.includes('เปิด dialog จาก service'));
    expect(trigger).toBeTruthy();

    trigger?.click();
    TestBed.inject(ApplicationRef).tick();

    const dialog = document.body.querySelector<HTMLElement>('[data-slot="dialog-content"]');
    expect(dialog).toBeTruthy();
    expect(dialog?.textContent).toContain('ยืนยันการตัดสต็อก');
    expect(
      Array.from(dialog?.querySelectorAll('hlm-dialog-footer button') ?? []).map((button) =>
        button.textContent?.trim(),
      ),
    ).toEqual(['ยกเลิก', 'ยืนยัน']);

    document.querySelectorAll('.cdk-overlay-container').forEach((container) => container.remove());
  });

  it('renders data display previews with shared domain components', async () => {
    const fixture = await setup(DesignSystem);
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelectorAll('app-kpi-card').length).toBeGreaterThan(0);
    expect(el.querySelectorAll('app-payment-chip').length).toBeGreaterThan(0);
    expect(el.querySelectorAll('app-progress-bar').length).toBeGreaterThan(0);
    expect(el.querySelectorAll('app-route-progress-row').length).toBeGreaterThan(0);
    expect(el.querySelectorAll('app-route-status-card').length).toBeGreaterThan(0);
    expect(el.querySelectorAll('app-status-chip').length).toBeGreaterThan(0);
    expect(el.querySelectorAll('app-filter-chips [role="tab"]').length).toBe(4);
  });

  it('renders thai date and THB formatting', async () => {
    const fixture = await setup(DesignSystem);
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain('฿');
    expect(text).toContain('ถัง');
  });
});
