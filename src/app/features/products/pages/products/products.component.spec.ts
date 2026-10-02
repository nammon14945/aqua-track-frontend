import { renderComponent } from '../../../../shared/testing/render-component.util';
import { Products } from './products.component';

describe('Products', () => {
  it('renders the page header and the under-construction placeholder', async () => {
    const fixture = await renderComponent(Products);
    const el: HTMLElement = fixture.nativeElement;

    expect(el.textContent).toContain('สินค้า & ราคา');
    expect(el.textContent).toContain('อยู่ระหว่างพัฒนา');
  });
});
