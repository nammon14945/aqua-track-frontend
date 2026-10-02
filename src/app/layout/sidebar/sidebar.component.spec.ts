import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { renderComponent } from '../../shared/testing/render-component.util';
import { SIDEBAR_NAV } from './sidebar-nav.model';
import { Sidebar } from './sidebar.component';

describe('Sidebar', () => {
  it('renders the brand, primary action and every nav group/item', async () => {
    const fixture = await renderComponent(Sidebar);
    const el: HTMLElement = fixture.nativeElement;

    expect(el.textContent).toContain('AquaTrack Pro');
    expect(el.textContent).toContain('สร้างออเดอร์ใหม่');
    expect(el.querySelector('a[routerLink="/orders"]')).toBeTruthy();

    for (const group of SIDEBAR_NAV) {
      expect(el.textContent).toContain(group.label);
      for (const item of group.items) {
        expect(el.textContent).toContain(item.label);
      }
    }

    expect(el.querySelectorAll('a[hlmSidebarMenuButton]').length).toBe(8);
  });

  it('navigates to the dashboard when the brand logo is clicked', async () => {
    const fixture = await renderComponent(Sidebar);
    const el: HTMLElement = fixture.nativeElement;

    const brand = el.querySelector('a[routerLink="/dashboard"]');
    expect(brand?.textContent).toContain('AquaTrack Pro');
  });

  it('shows the amber badge with the pending order count', async () => {
    const fixture = await renderComponent(Sidebar);
    const el: HTMLElement = fixture.nativeElement;

    const badge = el.querySelector('[hlmSidebarMenuBadge]');
    expect(badge?.textContent?.trim()).toBe('5');
    expect(badge?.className).toContain('bg-warning');
  });

  it('marks the menu item that matches the current route as active', async () => {
    const fixture = await renderComponent(Sidebar, {
      routes: [{ path: 'orders', children: [] }],
    });
    const router = TestBed.inject(Router);

    await router.navigateByUrl('/orders');
    fixture.detectChanges();

    const active = fixture.nativeElement.querySelector(
      'a[hlmSidebarMenuButton][data-active="true"]',
    ) as HTMLElement | null;
    expect(active?.textContent).toContain('ออเดอร์ & สายรถส่งน้ำ');
  });

  it('ignores pointer events on collapsed group labels so they never block nav buttons', async () => {
    const fixture = await renderComponent(Sidebar);
    const el: HTMLElement = fixture.nativeElement;

    const labels = Array.from(
      el.querySelectorAll<HTMLElement>('[data-slot="sidebar-group-label"]'),
    );
    expect(labels.length).toBe(SIDEBAR_NAV.length);

    for (const label of labels) {
      expect(label.className).toContain('group-data-[collapsible=icon]:pointer-events-none');
    }
  });

  it('renders the footer actions and version tag — without a user card', async () => {
    const fixture = await renderComponent(Sidebar);
    const el: HTMLElement = fixture.nativeElement;

    expect(el.textContent).toContain('ตั้งค่าระบบ');
    expect(el.textContent).toContain('ออกจากระบบ');
    expect(el.textContent).toContain('AquaTrack Cloud v2.4');
    expect(el.textContent).not.toContain('สมชาย ใจดี');
  });
});
