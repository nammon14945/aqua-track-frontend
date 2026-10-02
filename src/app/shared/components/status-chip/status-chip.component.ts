import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { ORDER_STATUS_LABEL, type ChipStatus } from '../../../core/models/domain.model';

export const statusChipVariants = cva(
  'inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-caption font-medium whitespace-nowrap transition-colors',
  {
    variants: {
      status: {
        pending:
          'bg-status-pending-soft text-status-pending-foreground border-status-pending-border',
        'in-transit':
          'bg-status-in-transit-soft text-status-in-transit-foreground border-status-in-transit-border',
        delivered:
          'bg-status-delivered-soft text-status-delivered-foreground border-status-delivered-border',
        cancelled:
          'bg-status-cancelled-soft text-status-cancelled-foreground border-status-cancelled-border',
        credit: 'bg-status-credit-soft text-status-credit-foreground border-status-credit-border',
        damaged: 'bg-danger-soft text-danger-soft-foreground border-danger-border',
        active: 'bg-success-soft text-success-soft-foreground border-success-border',
        paused: 'bg-muted text-muted-foreground border-border',
        neutral: 'bg-muted text-muted-foreground border-border',
      },
    },
    defaultVariants: { status: 'neutral' },
  },
);

export type StatusChipVariants = VariantProps<typeof statusChipVariants>;

const DOT_CLASS: Record<ChipStatus, string> = {
  pending: 'bg-status-pending',
  'in-transit': 'bg-status-in-transit',
  delivered: 'bg-status-delivered',
  cancelled: 'bg-status-cancelled',
  credit: 'bg-status-credit',
  damaged: 'bg-danger',
  active: 'bg-success',
  paused: 'bg-muted-foreground',
  neutral: 'bg-muted-foreground',
};

@Component({
  selector: 'app-status-chip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  templateUrl: './status-chip.component.html',
  styleUrl: './status-chip.component.scss',
})
export class StatusChip {
  public readonly status = input<ChipStatus>('neutral');
  public readonly label = input<string | null>(null);
  public readonly showDot = input(true);
  /** ใช้กับสถานะที่กำลังดำเนินอยู่ (เช่น กำลังส่ง) เพื่อให้จุดกระพริบ */
  public readonly pulse = input(false);
  /** ระบายสีป้ายต่างจากสีของสถานะ เช่น สายรถที่ล่าช้าใช้สีเตือนโดยยังเป็นสถานะ "กำลังส่ง" */
  public readonly tone = input<ChipStatus | null>(null);

  protected readonly _tone = computed(() => this.tone() ?? this.status());

  protected readonly _dotClass = computed(() => DOT_CLASS[this._tone()]);

  protected readonly text = computed(() => this.label() ?? ORDER_STATUS_LABEL[this.status()]);

  protected readonly _classes = computed(() => hlm(statusChipVariants({ status: this._tone() })));
}
