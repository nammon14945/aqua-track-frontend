import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { hlm } from '@spartan-ng/helm/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { PAYMENT_MODES, type PaymentMode } from '../../../core/models/domain.model';

const paymentChipVariants = cva(
  'inline-flex w-fit shrink-0 items-center gap-1 rounded-md border px-2 py-0.5 text-caption font-medium whitespace-nowrap [&_ng-icon]:text-[length:--spacing(3)]',
  {
    variants: {
      mode: {
        cash: 'border-border bg-muted text-muted-foreground',
        slip: 'border-success-border bg-success-soft text-success-soft-foreground',
        coupon: 'border-brand-teal-200 bg-brand-teal-50 text-brand-teal-700',
        credit: 'border-warning-border bg-warning-soft text-warning-soft-foreground',
      },
    },
    defaultVariants: { mode: 'cash' },
  },
);

const PAYMENT_ICON: Record<PaymentMode, string> = {
  cash: 'lucideBanknote',
  slip: 'lucideReceipt',
  coupon: 'lucideTicket',
  credit: 'lucideClock',
};

export type PaymentChipVariants = VariantProps<typeof paymentChipVariants>;

/**
 * ป้ายแสดง "วิธีชำระเงิน" แบบอ่านอย่างเดียว ใช้ในตารางออเดอร์/ใบเสร็จ
 * (ต่างจาก app-payment-mode-selector ที่ใช้เลือกค่า)
 */
@Component({
  selector: 'app-payment-chip',
  imports: [NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  templateUrl: './payment-chip.component.html',
  styleUrl: './payment-chip.component.scss',
})
export class PaymentChip {
  /** 'cash' | 'slip' | 'coupon' | 'credit' */
  public readonly mode = input<PaymentMode>('cash');
  /** ข้อความที่ต้องการแสดง เช่น "เครดิต 30 วัน" — ถ้าไม่ระบุจะใช้ชื่อโหมดมาตรฐาน */
  public readonly label = input<string | null>(null);
  public readonly showIcon = input(true);

  protected readonly _classes = computed(() => hlm(paymentChipVariants({ mode: this.mode() })));

  protected readonly icon = computed(() => PAYMENT_ICON[this.mode()]);

  protected readonly text = computed(
    () => this.label() ?? PAYMENT_MODES.find((m) => m.value === this.mode())?.label ?? '',
  );
}
