import { renderComponent } from '../../../../shared/testing/render-component.util';
import { DsColors } from './ds-colors.component';

describe('DsColors', () => {
  it('renders the colors section with swatches', async () => {
    const fixture = await renderComponent(DsColors);
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('section')?.id).toBe('colors');
    expect(el.querySelectorAll('app-ds-swatch').length).toBeGreaterThan(20);
    expect(el.textContent).toContain('brand-600');
  });
});
