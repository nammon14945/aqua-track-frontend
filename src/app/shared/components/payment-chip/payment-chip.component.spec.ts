import { renderComponent } from '../../testing/render-component.util';
import { PaymentChip } from './payment-chip.component';

describe('PaymentChip', () => {
  it('renders the standard label of the selected mode', async () => {
    const fixture = await renderComponent(PaymentChip, {
      setup: (f) => f.componentRef.setInput('mode', 'credit'),
    });

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('เครดิต');
  });

  it('renders a custom label when provided', async () => {
    const fixture = await renderComponent(PaymentChip, {
      setup: (f) => {
        f.componentRef.setInput('mode', 'credit');
        f.componentRef.setInput('label', 'เครดิต 30 วัน');
      },
    });

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('เครดิต 30 วัน');
  });
});
