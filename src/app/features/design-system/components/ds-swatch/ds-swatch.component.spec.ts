import { renderComponent } from '../../../../shared/testing/render-component.util';
import { DsSwatch } from './ds-swatch.component';

describe('DsSwatch', () => {
  it('renders the color name, value and usage note', async () => {
    const fixture = await renderComponent(DsSwatch, {
      setup: (f) => {
        f.componentRef.setInput('name', 'Brand');
        f.componentRef.setInput('value', '#0284C7');
        f.componentRef.setInput('swatchClass', 'bg-brand-600');
        f.componentRef.setInput('usage', 'ปุ่มหลัก');
      },
    });

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.bg-brand-600')).toBeTruthy();
    expect(el.textContent).toContain('Brand');
    expect(el.textContent).toContain('#0284C7');
    expect(el.textContent).toContain('ปุ่มหลัก');
  });
});
