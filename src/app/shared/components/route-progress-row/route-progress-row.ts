import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ChipStatus } from '../../models/domain';
import { ProgressBar, type ProgressTone } from '../progress-bar/progress-bar';
import { StatusChip } from '../status-chip/status-chip';

const badgeVariants = cva(
  'flex size-8 shrink-0 items-center justify-center rounded-lg text-caption font-bold tabular-nums',
  {
    variants: {
      tone: {
        brand: 'bg-brand-100 text-brand-700',
        teal: 'bg-brand-teal-100 text-brand-teal-700',
        violet: 'bg-violet-100 text-violet-700',
      },
    },
    defaultVariants: { tone: 'brand' },
  },
);

/**
 * แถวสถานะรถส่งน้ำแบบกะทัดรัด สำหรับวางเรียงในรายการ/แดชบอร์ด
 * ต่างจาก app-route-status-card ที่เป็นการ์ดเดี่ยวสำหรับวางใน grid
 */
@Component({
  selector: 'app-route-progress-row',
  imports: [ProgressBar, StatusChip],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <article
      class="bg-card hover:border-brand-300 flex flex-col gap-2.5 rounded-xl border p-4 transition-colors"
    >
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div class="flex items-start gap-3">
          <span [class]="_badgeClass()">#{{ truckNo() }}</span>
          <div class="flex flex-col">
            <span class="text-body-sm font-bold">{{ title() }}</span>
            <p class="text-caption text-muted-foreground">
              พนักงานขับรถ:
              <span class="text-foreground font-medium">{{ driverName() }}</span>
              @if (driverPhone()) {
                <span> • โทร: {{ driverPhone() }}</span>
              }
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3 self-end sm:self-center">
          <app-status-chip
            [status]="status()"
            [label]="statusLabel()"
            [pulse]="pulse()"
            [tone]="statusTone()"
          />
          <span class="text-body-sm font-bold tabular-nums" data-numeric>
            {{ bottleDelivered() }} / {{ bottleLoaded() }}
            <span class="text-caption font-normal text-muted-foreground"
              >ถัง ({{ percent() }}%)</span
            >
          </span>
        </div>
      </div>

      <app-progress-bar [value]="percent()" [tone]="progressTone()" size="lg" />

      <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-caption">
        <span class="text-muted-foreground">
          จัดส่งแล้ว {{ deliveredStops() }} จุดหมาย
          @if (emptyReturned() !== null) {
            <span> • เก็บถังเปล่ากลับ {{ emptyReturned() }} ใบ</span>
          }
          @if (note()) {
            <span> ({{ note() }})</span>
          }
        </span>
        @if (eta()) {
          <span class="text-muted-foreground">คาดการณ์สิ้นสุด: {{ eta() }}</span>
        }
      </div>
    </article>
  `,
})
export class RouteProgressRow {
  public readonly truckNo = input.required<string>();
  public readonly title = input.required<string>();
  public readonly driverName = input.required<string>();
  public readonly driverPhone = input<string | null>(null);
  public readonly status = input<ChipStatus>('in-transit');
  public readonly statusLabel = input<string | null>(null);
  /** สีของป้ายสถานะเมื่อต้องการเน้นต่างจากความหมายของสถานะ (เช่น สายรถล่าช้า) */
  public readonly statusTone = input<ChipStatus | null>(null);
  public readonly pulse = input(true);
  public readonly bottleDelivered = input.required<number>();
  public readonly bottleLoaded = input.required<number>();
  public readonly deliveredStops = input.required<number>();
  public readonly emptyReturned = input<number | null>(null);
  public readonly note = input<string | null>(null);
  public readonly eta = input<string | null>(null);
  public readonly badgeTone = input<VariantProps<typeof badgeVariants>['tone']>('brand');
  public readonly progressTone = input<ProgressTone>('brand');

  protected readonly _badgeClass = computed(() => hlm(badgeVariants({ tone: this.badgeTone() })));

  protected readonly percent = computed(() => {
    const loaded = this.bottleLoaded();
    if (!loaded) return 0;
    return Math.round((this.bottleDelivered() / loaded) * 100);
  });
}
