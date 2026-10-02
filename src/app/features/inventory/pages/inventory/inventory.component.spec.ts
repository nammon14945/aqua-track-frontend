import { renderComponent } from '../../../../shared/testing/render-component.util';
import { Inventory } from './inventory.component';

describe('Inventory', () => {
  it('renders the page header and the under-construction placeholder', async () => {
    const fixture = await renderComponent(Inventory);
    const el: HTMLElement = fixture.nativeElement;

    expect(el.textContent).toContain('คลังสินค้า');
    expect(el.textContent).toContain('อยู่ระหว่างพัฒนา');
  });
});
