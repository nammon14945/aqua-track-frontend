import { renderComponent } from '../../../../shared/testing/render-component.util';
import { Coupons } from './coupons.component';

describe('Coupons', () => {
  it('renders the page header and the under-construction placeholder', async () => {
    const fixture = await renderComponent(Coupons);
    const el: HTMLElement = fixture.nativeElement;

    expect(el.textContent).toContain('คูปอง & สมาชิก');
    expect(el.textContent).toContain('อยู่ระหว่างพัฒนา');
  });
});
