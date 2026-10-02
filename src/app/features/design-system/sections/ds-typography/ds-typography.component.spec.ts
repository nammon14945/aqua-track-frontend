import { renderComponent } from '../../../../shared/testing/render-component.util';
import { DsTypography } from './ds-typography.component';

describe('DsTypography', () => {
  it('renders the typography section with the type scale and icons', async () => {
    const fixture = await renderComponent(DsTypography);
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('section')?.id).toBe('typography');
    expect(el.textContent).toContain('text-display');
    expect(el.querySelectorAll('ng-icon').length).toBeGreaterThan(0);
  });
});
