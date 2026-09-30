import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { hlm } from '@spartan-ng/helm/utils';

export interface FilterChipItem {
  readonly value: string;
  readonly label: string;
  readonly count?: number;
}

/**
 * แถบตัวกรองแบบ chip — ใช้ร่วมกับตาราง/รายการที่มีสถานะให้กรอง
 * (ทั้งหมด / รอดำเนินการ / ระหว่างขนส่ง / จัดส่งแล้ว)
 */
@Component({
  selector: 'app-filter-chips',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div class="flex flex-wrap items-center gap-2" role="tablist" [attr.aria-label]="ariaLabel()">
      @for (item of items(); track item.value) {
        <button
          type="button"
          role="tab"
          [attr.aria-selected]="value() === item.value"
          [class]="_chipClass(item.value)"
          (click)="value.set(item.value)"
        >
          {{ item.label }}
          @if (item.count !== undefined) {
            <span class="tabular-nums"> ({{ item.count }})</span>
          }
        </button>
      }
    </div>
  `,
})
export class FilterChips {
  public readonly items = input.required<readonly FilterChipItem[]>();
  public readonly value = model.required<string>();
  public readonly ariaLabel = input('ตัวกรอง');

  protected _chipClass(chipValue: string): string {
    return hlm(
      'rounded-lg px-3 py-1.5 text-caption font-medium transition-colors',
      this.value() === chipValue
        ? 'bg-brand-50 text-brand-700 border-brand-200 border font-semibold'
        : 'text-muted-foreground hover:bg-muted border border-transparent',
    );
  }
}
