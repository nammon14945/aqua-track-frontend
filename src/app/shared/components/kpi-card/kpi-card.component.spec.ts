import { renderComponent } from '../../testing/render-component.util';
import { KpiCard } from './kpi-card.component';

describe('KpiCard', () => {
  it('renders label, value, unit and accent bar', async () => {
    const fixture = await renderComponent(KpiCard, {
      setup: (f) => {
        f.componentRef.setInput('label', 'ยอดขายวันนี้');
        f.componentRef.setInput('value', '12,500');
        f.componentRef.setInput('unit', 'บาท');
        f.componentRef.setInput('icon', 'lucideBanknote');
      },
    });

    const el = fixture.nativeElement as HTMLElement;
    const text = el.textContent ?? '';
    expect(text).toContain('ยอดขายวันนี้');
    expect(text).toContain('12,500');
    expect(text).toContain('บาท');
    expect(el.querySelector('[aria-hidden="true"]')).toBeTruthy();
  });

  it('shows a positive delta with a success tone', async () => {
    const fixture = await renderComponent(KpiCard, {
      setup: (f) => {
        f.componentRef.setInput('label', 'ออเดอร์');
        f.componentRef.setInput('value', 20);
        f.componentRef.setInput('delta', 5.2);
      },
    });

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('+5.2%');
  });
});
