import { renderComponent } from '../../../../shared/testing/render-component.util';
import { DsActions } from './ds-actions.component';

describe('DsActions', () => {
  it('renders the actions section with status chips and filter chips', async () => {
    const fixture = await renderComponent(DsActions);
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('section')?.id).toBe('actions');
    expect(el.querySelectorAll('app-status-chip').length).toBeGreaterThan(0);
    expect(el.querySelectorAll('app-filter-chips [role="tab"]').length).toBe(4);
  });

  it('shows the loading state when simulating a save', async () => {
    const fixture = await renderComponent(DsActions);
    const el = fixture.nativeElement as HTMLElement;

    const button = Array.from(el.querySelectorAll<HTMLButtonElement>('button')).find(
      (item) => item.textContent?.trim() === 'บันทึก',
    );
    expect(button).toBeTruthy();

    button?.click();
    fixture.detectChanges();
    expect(button?.textContent).toContain('กำลังบันทึก');
  });
});
