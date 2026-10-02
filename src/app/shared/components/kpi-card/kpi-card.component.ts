import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { hlm } from '@spartan-ng/helm/utils';
import { cva } from 'class-variance-authority';

/**
 * Tone ของ KPI card — สีถูกใช้กับ "กล่องไอคอน" และ "แถบ accent ด้านล่าง" เท่านั้น
 * ตัวการ์ดยังเป็นพื้นขาวเสมอ เพื่อให้อ่านง่ายเมื่อวางเรียงกันหลายใบ
 */
export type KpiTone =
  'default' | 'brand' | 'teal' | 'violet' | 'success' | 'warning' | 'credit' | 'danger';

const CARD_CLASS =
  'bg-card text-card-foreground relative flex flex-col gap-3 overflow-hidden rounded-xl border p-5 shadow-soft-sm transition-shadow hover:shadow-soft-md';

export const kpiIconVariants = cva(
  'flex size-11 shrink-0 items-center justify-center rounded-lg border [&_ng-icon]:text-[length:--spacing(5)]',
  {
    variants: {
      tone: {
        default: 'bg-muted text-muted-foreground border-border',
        brand: 'bg-brand-50 text-brand-600 border-brand-100',
        teal: 'bg-brand-teal-50 text-brand-teal-600 border-brand-teal-100',
        violet: 'bg-violet-50 text-violet-600 border-violet-100',
        success: 'bg-success-soft text-success-soft-foreground border-success-border',
        warning: 'bg-warning-soft text-warning-soft-foreground border-warning-border',
        credit: 'bg-credit-soft text-credit-soft-foreground border-credit-border',
        danger: 'bg-danger-soft text-danger-soft-foreground border-danger-border',
      },
    },
    defaultVariants: { tone: 'default' },
  },
);

const ACCENT_BAR_VARIANTS = cva('absolute inset-x-0 bottom-0 h-1', {
  variants: {
    tone: {
      default: 'bg-border',
      brand: 'bg-brand-500',
      teal: 'bg-brand-teal-500',
      violet: 'bg-violet-500',
      success: 'bg-success',
      warning: 'bg-warning',
      credit: 'bg-credit',
      danger: 'bg-danger',
    },
  },
  defaultVariants: { tone: 'default' },
});

const VALUE_TONE_CLASS: Record<KpiTone, string> = {
  default: 'text-foreground',
  brand: 'text-brand-700',
  teal: 'text-brand-teal-700',
  violet: 'text-violet-700',
  success: 'text-success-soft-foreground',
  warning: 'text-warning-soft-foreground',
  credit: 'text-credit-soft-foreground',
  danger: 'text-danger-soft-foreground',
};

@Component({
  selector: 'app-kpi-card',
  imports: [NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '_hostClass()',
    '[attr.data-tone]': 'tone()',
  },
  templateUrl: './kpi-card.component.html',
  styleUrl: './kpi-card.component.scss',
})
export class KpiCard {
  public readonly label = input.required<string>();
  public readonly value = input.required<string | number>();
  public readonly unit = input<string | null>(null);
  public readonly icon = input<string | null>(null);
  public readonly tone = input<KpiTone>('default');
  public readonly delta = input<number | null>(null);
  public readonly hint = input<string | null>(null);
  public readonly invertDelta = input(false);
  /** ระบายสีตัวเลขหลักด้วยสีเดียวกับ tone (ใช้กับยอดค้างชำระ/ยอดที่ต้องเฝ้าระวัง) */
  public readonly valueAccent = input(false);
  /** แถบสีบาง ๆ ด้านล่างการ์ด ตามสเปกดีไซน์จาก Stitch */
  public readonly accentBar = input(true);

  protected readonly _hostClass = computed(() => hlm(CARD_CLASS));
  protected readonly _iconClass = computed(() => hlm(kpiIconVariants({ tone: this.tone() })));
  protected readonly _accentBarClass = computed(() =>
    hlm(ACCENT_BAR_VARIANTS({ tone: this.tone() })),
  );

  protected readonly _valueClass = computed(() =>
    this.valueAccent() ? VALUE_TONE_CLASS[this.tone()] : 'text-foreground',
  );

  protected readonly _deltaText = computed(() => {
    const delta = this.delta();
    if (delta === null) return '';
    const sign = delta > 0 ? '+' : '';
    return `${sign}${delta.toFixed(1)}%`;
  });

  protected readonly _deltaToneClass = computed(() => {
    const delta = this.delta() ?? 0;
    if (delta === 0) return 'text-muted-foreground';
    const positive = this.invertDelta() ? delta < 0 : delta > 0;
    return positive ? 'text-success-soft-foreground' : 'text-danger-soft-foreground';
  });
}
