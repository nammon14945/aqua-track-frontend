import { renderComponent } from '../../../../shared/testing/render-component.util';
import { DsNavigation } from './ds-navigation.component';

describe('DsNavigation', () => {
  it('renders the navigation section with every preview', async () => {
    const fixture = await renderComponent(DsNavigation);
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('section')?.id).toBe('navigation');
    expect(el.querySelectorAll('app-ds-preview').length).toBe(5);
    expect(el.textContent).toContain('เงื่อนไขการคืนถังเปล่า');
  });
});
