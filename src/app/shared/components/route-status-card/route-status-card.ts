import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { StatusChip } from '../status-chip/status-chip';
import { ProgressBar, type ProgressTone } from '../progress-bar/progress-bar';
import { type ChipStatus } from '../../models/domain';

@Component({
  selector: 'app-route-status-card',
  imports: [NgIcon, StatusChip, ProgressBar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <article
      class="bg-card text-card-foreground flex flex-col gap-3 rounded-xl border p-4 shadow-soft-sm transition-shadow hover:shadow-soft-md"
    >
      <header class="flex items-start justify-between gap-3">
        <div class="flex items-center gap-3">
          <span
            class="bg-brand-50 text-brand-700 flex size-10 shrink-0 items-center justify-center rounded-lg [&_ng-icon]:text-[length:--spacing(5)]"
          >
            <ng-icon name="lucideTruck" />
          </span>
          <div class="flex flex-col">
            <span class="text-h4 leading-tight">{{ truckName() }}</span>
            <span class="text-caption text-muted-foreground">
              {{ zone() }}
              @if (driverName()) {
                · {{ driverName() }}
              }
            </span>
          </div>
        </div>
        <app-status-chip [status]="status()" [pulse]="status() === 'in-transit'" />
      </header>

      <div class="flex flex-col gap-1.5">
        <div class="flex items-center justify-between text-caption">
          <span class="text-muted-foreground">ความคืบหน้า</span>
          <span class="tabular-nums font-medium" data-numeric>{{ percent() }}%</span>
        </div>
        <app-progress-bar [value]="percent()" [tone]="progressTone()" size="md" />
      </div>

      <footer class="flex items-center justify-between gap-2 text-caption">
        <div class="flex items-center gap-3">
          <span class="inline-flex items-center gap-1 tabular-nums" data-numeric>
            <ng-icon name="lucideCircleCheck" class="text-success" />
            {{ deliveredCount() }}/{{ totalCount() }} จุด
          </span>
          <span class="inline-flex items-center gap-1 tabular-nums" data-numeric>
            <ng-icon name="lucideDroplet" class="text-brand-600" />
            {{ bottleCount() }} ถัง
          </span>
        </div>
        @if (remainingLabel()) {
          <span class="text-muted-foreground">{{ remainingLabel() }}</span>
        }
      </footer>
    </article>
  `,
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
