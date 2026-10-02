import { renderComponent } from '../../../../shared/testing/render-component.util';
import { DsForms } from './ds-forms.component';

describe('DsForms', () => {
  it('renders the forms section with inputs and payment mode selector', async () => {
    const fixture = await renderComponent(DsForms);
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('section')?.id).toBe('forms');
    expect(el.querySelectorAll('input[hlmInput]').length).toBeGreaterThan(0);
    expect(el.querySelectorAll('app-payment-mode-selector button[role="radio"]').length).toBe(4);
  });
});
