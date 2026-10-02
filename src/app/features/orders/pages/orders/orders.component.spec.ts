import { renderComponent } from '../../../../shared/testing/render-component.util';
import { Orders } from './orders.component';

describe('Orders', () => {
  it('renders the page header and the under-construction placeholder', async () => {
    const fixture = await renderComponent(Orders);
    const el: HTMLElement = fixture.nativeElement;

    expect(el.textContent).toContain('ออเดอร์ & สายรถส่งน้ำ');
    expect(el.textContent).toContain('อยู่ระหว่างพัฒนา');
  });
});
