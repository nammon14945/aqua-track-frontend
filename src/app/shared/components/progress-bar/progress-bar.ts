import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { HlmProgressImports } from '@spartan-ng/helm/progress';
import { hlm } from '@spartan-ng/helm/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const trackVariants = cva('w-full', {
  variants: {
    size: {
      sm: 'h-1.5',
      md: 'h-2',
      lg: 'h-2.5',
    },
  },
  defaultVariants: { size: 'md' },
});

export const progressIndicatorVariants = cva('', {
  variants: {
    tone: {
      brand: 'bg-brand-600',
      'brand-light': 'bg-brand-500',
      teal: 'bg-brand-teal-500',
      success: 'bg-success',
      warning: 'bg-warning',
      credit: 'bg-credit',
      danger: 'bg-danger',
      neutral: 'bg-foreground',
    },
  },
  defaultVariants: { tone: 'brand' },
});

export type ProgressTone = NonNullable<VariantProps<typeof progressIndicatorVariants>['tone']>;

/**
 * แถบความคืบหน้า — ครอบ `hlm-progress` + `hlm-progress-indicator` ให้ใช้เป็นชิ้นเดียว
 * (hlm-progress เปล่า ๆ ไม่มี indicator จึงจะไม่แสดงแถบสี)
 */
@Component({
  selector: 'app-progress-bar',
  imports: [HlmProgressImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <hlm-progress [value]="value()" [class]="_trackClass()">
      <hlm-progress-indicator [class]="_indicatorClass()" />
    </hlm-progress>
  `,
})
export class ProgressBar {
  public readonly value = input<number | null>(0);
  public readonly tone = input<ProgressTone>('brand');
  public readonly size = input<VariantProps<typeof trackVariants>['size']>('md');

  protected readonly _trackClass = computed(() => hlm(trackVariants({ size: this.size() })));
  protected readonly _indicatorClass = computed(() =>
    hlm(progressIndicatorVariants({ tone: this.tone() })),
  );
}
