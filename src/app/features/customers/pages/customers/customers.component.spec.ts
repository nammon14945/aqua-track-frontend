import { renderComponent } from '../../../../shared/testing/render-component.util';
import { Customers } from './customers.component';

describe('Customers', () => {
  it('renders the page header and the under-construction placeholder', async () => {
    const fixture = await renderComponent(Customers);
    const el: HTMLElement = fixture.nativeElement;

    expect(el.textContent).toContain('ลูกค้า');
    expect(el.textContent).toContain('อยู่ระหว่างพัฒนา');
  });
});
