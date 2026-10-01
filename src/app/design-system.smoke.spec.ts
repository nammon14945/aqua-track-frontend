import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { provideSpartanHlm } from '@spartan-ng/helm/utils';
import { ApplicationRef, type Type } from '@angular/core';
import { APP_ICONS } from './core/icons';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { AdminDashboard } from './pages/admin/dashboard';
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

  it('renders status chips and KPI cards with domain data', async () => {
    const fixture = await setup(AdminDashboard);
    const el: HTMLElement = fixture.nativeElement;

    const chips = el.querySelectorAll('app-status-chip');
    const kpis = el.querySelectorAll('app-kpi-card');
    const routes = el.querySelectorAll('app-route-progress-row');
    const rows = el.querySelectorAll('tbody tr');

    expect(chips.length).toBeGreaterThan(0);
    expect(kpis.length).toBe(5);
    expect(routes.length).toBe(3);
    expect(rows.length).toBe(5);
  });

  it('renders dashboard progress bars, payment chips and filter chips', async () => {
    const fixture = await setup(AdminDashboard);
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelectorAll('app-progress-bar').length).toBe(3);
    expect(el.querySelectorAll('app-payment-chip').length).toBe(4);
    expect(el.querySelectorAll('app-payment-chip [data-mode]').length).toBe(4);
    expect(el.querySelector('app-payment-chip [data-mode="credit"]')).toBeTruthy();
    expect(el.querySelector('app-payment-chip [data-mode="coupon"]')).toBeTruthy();
    expect(el.querySelectorAll('app-filter-chips [role="tab"]').length).toBe(4);
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

  it('renders thai date and THB formatting', async () => {
    const fixture = await setup(AdminDashboard);
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain('฿');
    expect(text).toContain('ถัง');
  });

  it('renders the admin layout shell with sidebar navigation', async () => {
    const fixture = await setup(AdminLayout);
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('hlm-sidebar')).toBeTruthy();
    expect(el.querySelector('main[hlmSidebarInset]')).toBeTruthy();
    expect(el.querySelectorAll('[hlmSidebarMenuButton]').length).toBeGreaterThanOrEqual(4);
  });

  it('places the user profile in the topbar (not the sidebar)', async () => {
    const fixture = await setup(AdminLayout);
    const el: HTMLElement = fixture.nativeElement;

    const profile = el.querySelector('header [data-slot="current-user"]');
    expect(profile).toBeTruthy();
    expect(profile?.textContent).toContain('สมศักดิ์ สุวรรณเมธา');
    expect(profile?.textContent).toContain('ผู้ดูแลระบบ & ฝ่ายบัญชี');
    expect(profile?.querySelector('hlm-avatar')).toBeTruthy();

    // โปรไฟล์ต้องไม่ถูกย้ายไปอยู่ใน sidebar footer
    expect(el.querySelector('hlm-sidebar')?.textContent).not.toContain('สมศักดิ์');
  });
});
