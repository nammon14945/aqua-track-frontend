import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { provideSpartanHlm } from '@spartan-ng/helm/utils';
import { type Type } from '@angular/core';
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
