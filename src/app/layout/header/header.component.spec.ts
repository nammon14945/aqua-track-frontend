import { flushMicrotasks, renderComponent } from '../../shared/testing/render-component.util';
import { Header } from './header.component';

describe('Header', () => {
  it('renders toggle, search, notification badge, profile and theme toggle', async () => {
    const fixture = await renderComponent(Header);
    const el: HTMLElement = fixture.nativeElement;

    expect(el.querySelector('button[hlmSidebarTrigger]')).toBeTruthy();
    expect(el.querySelector('[data-testid="search-input"]')?.getAttribute('placeholder')).toContain(
      'ค้นหารหัสออเดอร์',
    );
    expect(el.textContent).toContain('5');
    expect(el.textContent).toContain('สมชาย ใจดี');
    expect(el.textContent).toContain('ผู้จัดการ');
    expect(el.querySelector('app-theme-toggle')).toBeTruthy();
  });

  it('filters the mock search results while typing and highlights the term', async () => {
    const fixture = await renderComponent(Header);
    const el: HTMLElement = fixture.nativeElement;
    const input = el.querySelector<HTMLInputElement>('[data-testid="search-input"]')!;

    input.value = 'สยาม';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const panel = el.querySelector('[data-testid="search-panel"]');
    expect(panel).toBeTruthy();
    expect(el.querySelectorAll('[data-testid="search-result"]').length).toBe(3);
    expect(panel?.querySelectorAll('mark').length).toBeGreaterThan(0);
  });

  it('opens the notification panel with the three mock items', async () => {
    const fixture = await renderComponent(Header);
    const el: HTMLElement = fixture.nativeElement;
    const trigger = el.querySelector<HTMLButtonElement>('[data-testid="notification-trigger"]')!;

    trigger.click();
    await flushMicrotasks();
    fixture.detectChanges();
    await flushMicrotasks();

    const panel = document.body.querySelector('[data-slot="popover-content"]');
    expect(panel).toBeTruthy();
    expect(panel?.textContent).toContain('ออเดอร์ใหม่ด่วน');
    expect(panel?.textContent).toContain('ลูกหนี้ค้างชำระเกิน 15 วัน');
    expect(panel?.textContent).toContain('ถังเปล่าค้างคืนไม่ครบ');
  });
});
