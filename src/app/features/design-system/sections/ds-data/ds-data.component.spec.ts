import { renderComponent } from '../../../../shared/testing/render-component.util';
import { DsData } from './ds-data.component';

describe('DsData', () => {
  it('renders the data section with KPI cards and route cards', async () => {
    const fixture = await renderComponent(DsData);
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('section')?.id).toBe('data');
    expect(el.querySelectorAll('app-kpi-card').length).toBe(5);
    expect(el.querySelectorAll('app-route-status-card').length).toBe(3);
    expect(el.querySelectorAll('app-route-progress-row').length).toBe(2);
  });

  it('renders the data table with computed totals', async () => {
    const fixture = await renderComponent(DsData);
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelectorAll('tbody tr').length).toBe(6);

    const footer = el.querySelector('tfoot')?.textContent ?? '';
    expect(footer).toContain('482');
    expect(footer).toContain('฿63,320.00');
  });
});
