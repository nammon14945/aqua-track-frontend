import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { hlm } from '@spartan-ng/helm/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const bottleCountVariants = cva('inline-flex items-center gap-1.5 tabular-nums whitespace-nowrap', {
  variants: {
    size: {
      sm: 'text-caption [&_ng-icon]:text-[length:--spacing(3.5)]',
      md: 'text-body [&_ng-icon]:text-[length:--spacing(4)]',
      lg: 'text-h3 [&_ng-icon]:text-[length:--spacing(5)]',
    },
    tone: {
      default: 'text-foreground',
      muted: 'text-muted-foreground',
      brand: 'text-brand-700',
      success: 'text-success-soft-foreground',
      danger: 'text-danger-soft-foreground',
      credit: 'text-credit-soft-foreground',
    },
    emphasis: {
      plain: '',
      strong: 'font-semibold',
      badge: '[&_ng-icon]:text-[length:--spacing(3.5)] rounded-full border px-2 py-0.5',
    },
  },
  compoundVariants: [
    { emphasis: 'badge', tone: 'default', class: 'bg-muted border-border' },
    { emphasis: 'badge', tone: 'muted', class: 'bg-muted border-border' },
    { emphasis: 'badge', tone: 'brand', class: 'bg-brand-50 border-brand-200' },
    { emphasis: 'badge', tone: 'success', class: 'bg-success-soft border-success-border' },
    { emphasis: 'badge', tone: 'danger', class: 'bg-danger-soft border-danger-border' },
    { emphasis: 'badge', tone: 'credit', class: 'bg-credit-soft border-credit-border' },
  ],
  defaultVariants: { size: 'md', tone: 'default', emphasis: 'plain' },
});

export type BottleCountVariants = VariantProps<typeof bottleCountVariants>;

@Component({
  selector: 'app-bottle-count',
  imports: [NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  templateUrl: './bottle-count.component.html',
  styleUrl: './bottle-count.component.scss',
})
export class BottleCount {
  public readonly value = input.required<number>();
  public readonly label = input<string | null>(null);
  public readonly size = input<BottleCountVariants['size']>('md');
  public readonly tone = input<BottleCountVariants['tone']>('default');
  public readonly emphasis = input<BottleCountVariants['emphasis']>('plain');
  public readonly icon = input('lucideDroplet');
  public readonly signed = input(false);

  protected readonly _classes = computed(() =>
    hlm(bottleCountVariants({ size: this.size(), tone: this.tone(), emphasis: this.emphasis() })),
  );

  protected readonly _valueClass = computed(() =>
    this.emphasis() === 'strong' || this.emphasis() === 'badge' ? 'font-semibold' : '',
  );

  protected readonly _display = computed(() => {
    const value = this.value();
    if (!this.signed()) return `${value}`;
    return value > 0 ? `+${value}` : `${value}`;
  });
}
