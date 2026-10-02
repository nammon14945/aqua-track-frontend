import { renderComponent } from '../../testing/render-component.util';
import { BottleCount } from './bottle-count.component';

describe('BottleCount', () => {
  it('renders the value with a signed display and label', async () => {
    const fixture = await renderComponent(BottleCount, {
      setup: (f) => {
        f.componentRef.setInput('value', 12);
        f.componentRef.setInput('label', 'ถัง');
        f.componentRef.setInput('signed', true);
      },
    });

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('+12');
    expect(text).toContain('ถัง');
  });

  it('renders a negative value as-is', async () => {
    const fixture = await renderComponent(BottleCount, {
      setup: (f) => {
        f.componentRef.setInput('value', -3);
        f.componentRef.setInput('signed', true);
      },
    });

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('-3');
  });
});
