import { renderComponent } from '../../../../shared/testing/render-component.util';
import { Finance } from './finance.component';

describe('Finance', () => {
  it('renders the page header and the under-construction placeholder', async () => {
    const fixture = await renderComponent(Finance);
    const el: HTMLElement = fixture.nativeElement;

    expect(el.textContent).toContain('การเงิน & ลูกหนี้');
    expect(el.textContent).toContain('อยู่ระหว่างพัฒนา');
  });
});
