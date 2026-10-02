import { renderComponent } from '../../testing/render-component.util';
import { FilterChips } from './filter-chips.component';

describe('FilterChips', () => {
  it('renders every chip and updates the value on click', async () => {
    const fixture = await renderComponent(FilterChips, {
      setup: (f) => {
        f.componentRef.setInput('items', [
          { value: 'all', label: 'ทั้งหมด', count: 4 },
          { value: 'pending', label: 'รอดำเนินการ', count: 2 },
        ]);
        f.componentRef.setInput('value', 'all');
      },
    });

    const buttons = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
      'button[role="tab"]',
    );
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toContain('(4)');

    buttons[1].click();
    expect(fixture.componentInstance.value()).toBe('pending');
  });
});
