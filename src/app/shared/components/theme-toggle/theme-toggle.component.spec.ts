import { renderComponent } from '../../testing/render-component.util';
import { ThemeToggle } from './theme-toggle.component';

describe('ThemeToggle', () => {
  it('toggles dark mode on click', async () => {
    const fixture = await renderComponent(ThemeToggle);
    const button = (fixture.nativeElement as HTMLElement).querySelector('button');
    expect(button).toBeTruthy();

    button?.click();
    fixture.detectChanges();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(button?.getAttribute('aria-label')).toBe('เปลี่ยนเป็นโหมดสว่าง');

    button?.click();
    fixture.detectChanges();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(button?.getAttribute('aria-label')).toBe('เปลี่ยนเป็นโหมดมืด');
  });
});
