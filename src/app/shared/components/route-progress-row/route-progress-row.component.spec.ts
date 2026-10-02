import { renderComponent } from '../../testing/render-component.util';
import { RouteProgressRow } from './route-progress-row.component';

describe('RouteProgressRow', () => {
  it('renders truck info and computed delivery percentage', async () => {
    const fixture = await renderComponent(RouteProgressRow, {
      setup: (f) => {
        f.componentRef.setInput('truckNo', 'A1');
        f.componentRef.setInput('title', 'สายบางแค');
        f.componentRef.setInput('driverName', 'สมชาย');
        f.componentRef.setInput('bottleDelivered', 50);
        f.componentRef.setInput('bottleLoaded', 100);
        f.componentRef.setInput('deliveredStops', 3);
      },
    });

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('#A1');
    expect(text).toContain('สมชาย');
    expect(text).toContain('ถัง (50%)');
    expect(text).toContain('จัดส่งแล้ว 3 จุดหมาย');
  });
});
