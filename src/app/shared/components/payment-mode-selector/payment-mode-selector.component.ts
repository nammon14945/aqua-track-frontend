import { ChangeDetectionStrategy, Component, model, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { hlm } from '@spartan-ng/helm/utils';
import { PAYMENT_MODES, type PaymentMode } from '../../../core/models/domain.model';

@Component({
  selector: 'app-payment-mode-selector',
  imports: [NgIcon, HlmButtonImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  templateUrl: './payment-mode-selector.component.html',
  styleUrl: './payment-mode-selector.component.scss',
})
export class PaymentModeSelector {
  public readonly value = model<PaymentMode>('cash');
  public readonly label = input<string | null>('ช่องทางการชำระเงิน');
  public readonly showDescriptions = input(true);
  public readonly size = input<'default' | 'lg'>('default');

  protected readonly modes = input<readonly (typeof PAYMENT_MODES)[number][]>(PAYMENT_MODES);

  protected readonly _optionClass = () =>
    hlm(
      'h-auto w-full min-w-0 justify-start gap-2 py-2.5 text-label whitespace-normal',
      this.size() === 'lg' ? 'min-h-12' : 'min-h-10',
    );
}
