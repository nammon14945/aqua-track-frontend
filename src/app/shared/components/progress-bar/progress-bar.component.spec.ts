import { renderComponent } from '../../testing/render-component.util';
import { ProgressBar } from './progress-bar.component';

describe('ProgressBar', () => {
  it('renders the progress track and indicator', async () => {
    const fixture = await renderComponent(ProgressBar, {
      setup: (f) => f.componentRef.setInput('value', 60),
    });

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('hlm-progress')).toBeTruthy();
    expect(el.querySelector('hlm-progress-indicator')).toBeTruthy();
  });
});
