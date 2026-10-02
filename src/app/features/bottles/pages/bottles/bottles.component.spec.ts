import { renderComponent } from '../../../../shared/testing/render-component.util';
import { Bottles } from './bottles.component';

describe('Bottles', () => {
  it('renders the page header and the under-construction placeholder', async () => {
    const fixture = await renderComponent(Bottles);
    const el: HTMLElement = fixture.nativeElement;

    expect(el.textContent).toContain('ถังน้ำเปล่า');
    expect(el.textContent).toContain('อยู่ระหว่างพัฒนา');
  });
});
