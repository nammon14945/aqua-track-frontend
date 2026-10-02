import { renderComponent } from '../../testing/render-component.util';
import { RouteStatusCard } from './route-status-card.component';

describe('RouteStatusCard', () => {
  it('renders truck info, progress and remaining stops', async () => {
    const fixture = await renderComponent(RouteStatusCard, {
      setup: (f) => {
        f.componentRef.setInput('truckName', 'รถคันที่ 1');
        f.componentRef.setInput('zone', 'บางแค');
        f.componentRef.setInput('driverName', 'สมชาย');
        f.componentRef.setInput('deliveredCount', 2);
        f.componentRef.setInput('totalCount', 5);
        f.componentRef.setInput('bottleCount', 120);
      },
    });

    const text = ((fixture.nativeElement as HTMLElement).textContent ?? '').replace(/\s+/g, ' ');
    expect(text).toContain('รถคันที่ 1');
    expect(text).toContain('บางแค · สมชาย');
    expect(text).toContain('40%');
    expect(text).toContain('เหลืออีก 3 จุด');
    expect(text).toContain('120 ถัง');
  });
});
