import { renderComponent } from '../../testing/render-component.util';
import { PaymentModeSelector } from './payment-mode-selector.component';

describe('PaymentModeSelector', () => {
  it('renders every payment mode and updates the value on click', async () => {
    const fixture = await renderComponent(PaymentModeSelector, {
      setup: (f) => f.componentRef.setInput('value', 'cash'),
    });

    const buttons = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>(
      'button[role="radio"]',
    );
    expect(buttons.length).toBe(4);
    expect(buttons[0].getAttribute('aria-checked')).toBe('true');

    buttons[1].click();
    expect(fixture.componentInstance.value()).toBe('slip');
  });
});
