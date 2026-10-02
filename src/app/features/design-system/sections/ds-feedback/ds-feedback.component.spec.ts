import { renderComponent } from '../../../../shared/testing/render-component.util';
import { DsFeedback } from './ds-feedback.component';

describe('DsFeedback', () => {
  it('renders the feedback section with alerts and triggers', async () => {
    const fixture = await renderComponent(DsFeedback);
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('section')?.id).toBe('feedback');
    expect(el.textContent).toContain('แจ้งเตือนสต็อก');
    expect(el.querySelectorAll('app-ds-preview').length).toBe(6);
  });
});
