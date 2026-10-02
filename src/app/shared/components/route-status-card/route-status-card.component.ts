import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { StatusChip } from '../status-chip/status-chip.component';
import { ProgressBar, type ProgressTone } from '../progress-bar/progress-bar.component';
import { type ChipStatus } from '../../../core/models/domain.model';

@Component({
  selector: 'app-route-status-card',
  imports: [NgIcon, StatusChip, ProgressBar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block h-full' },
  templateUrl: './route-status-card.component.html',
  styleUrl: './route-status-card.component.scss',
})
export class RouteStatusCard {
  public readonly truckName = input.required<string>();
  public readonly zone = input.required<string>();
  public readonly driverName = input<string | null>(null);
  public readonly status = input<ChipStatus>('in-transit');
  public readonly deliveredCount = input.required<number>();
  public readonly totalCount = input.required<number>();
  public readonly bottleCount = input.required<number>();
  public readonly progressTone = input<ProgressTone>('brand');

  protected readonly percent = computed(() => {
    const total = this.totalCount();
    if (!total) return 0;
    return Math.round((this.deliveredCount() / total) * 100);
  });

  protected readonly remainingLabel = computed(() => {
    const remaining = this.totalCount() - this.deliveredCount();
    return remaining > 0 ? `เหลืออีก ${remaining} จุด` : 'ครบทุกจุดแล้ว';
  });
}
