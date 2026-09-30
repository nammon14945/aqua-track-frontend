import { ChangeDetectionStrategy, Component, model, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { hlm } from '@spartan-ng/helm/utils';
import { PAYMENT_MODES, type PaymentMode } from '../../models/domain';

@Component({
  selector: 'app-payment-mode-selector',
  imports: [NgIcon, HlmButtonImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    @if (label()) {
      <span class="text-label text-muted-foreground mb-2 block">{{ label() }}</span>
    }
    <div
      class="grid grid-cols-2 gap-2 sm:grid-cols-4"
      role="radiogroup"
      [attr.aria-label]="label()"
    >
      @for (mode of modes(); track mode.value) {
        <button
          type="button"
          hlmBtn
          role="radio"
          [attr.aria-checked]="value() === mode.value"
          [variant]="value() === mode.value ? 'default' : 'outline'"
          [class]="_optionClass()"
          (click)="value.set(mode.value)"
        >
          <ng-icon [name]="mode.icon" data-icon="inline-start" />
          <span class="flex min-w-0 flex-1 flex-col items-start text-start leading-tight">
            <span class="truncate">{{ mode.label }}</span>
            @if (showDescriptions()) {
              <span class="text-[11px] font-normal whitespace-normal opacity-80">
                {{ mode.description }}
              </span>
            }
          </span>
        </button>
      }
    </div>
  `,
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
