import { renderComponent } from '../../../../shared/testing/render-component.util';
import { Dashboard } from './dashboard.component';

describe('Dashboard', () => {
  it('renders the page header and the under-construction placeholder', async () => {
    const fixture = await renderComponent(Dashboard);
    const el: HTMLElement = fixture.nativeElement;

    expect(el.textContent).toContain('แดชบอร์ด');
    expect(el.textContent).toContain('อยู่ระหว่างพัฒนา');
  });
});
