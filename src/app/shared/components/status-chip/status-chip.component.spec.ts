import { renderComponent } from '../../testing/render-component.util';
import { StatusChip } from './status-chip.component';

describe('StatusChip', () => {
  it('renders the standard label of the status', async () => {
    const fixture = await renderComponent(StatusChip, {
      setup: (f) => f.componentRef.setInput('status', 'pending'),
    });

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('รอดำเนินการ');
  });

  it('prefers a custom label and a custom tone', async () => {
    const fixture = await renderComponent(StatusChip, {
      setup: (f) => {
        f.componentRef.setInput('status', 'in-transit');
        f.componentRef.setInput('tone', 'cancelled');
        f.componentRef.setInput('label', 'ล่าช้า');
      },
    });

    const chip = (fixture.nativeElement as HTMLElement).querySelector('[data-status]');
    expect(chip?.getAttribute('data-status')).toBe('cancelled');
    expect(chip?.textContent).toContain('ล่าช้า');
  });
});
