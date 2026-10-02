import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmButtonGroupImports } from '@spartan-ng/helm/button-group';
import { HlmKbdImports } from '@spartan-ng/helm/kbd';
import { HlmSpinner } from '@spartan-ng/helm/spinner';
import { HlmToggleImports } from '@spartan-ng/helm/toggle';
import { HlmToggleGroupImports } from '@spartan-ng/helm/toggle-group';
import { StatusChip } from '../../../../shared/components/status-chip/status-chip.component';
import {
  FilterChips,
  type FilterChipItem,
} from '../../../../shared/components/filter-chips/filter-chips.component';
import { DsPreview } from '../../components/ds-preview/ds-preview.component';
import { DsSection } from '../../components/ds-section/ds-section.component';

const STATUSES = [
  'pending',
  'in-transit',
  'delivered',
  'cancelled',
  'credit',
  'damaged',
  'active',
  'paused',
  'neutral',
] as const;

@Component({
  selector: 'app-ds-actions',
  imports: [
    DsSection,
    DsPreview,
    NgIcon,
    HlmBadgeImports,
    HlmButtonImports,
    HlmButtonGroupImports,
    HlmKbdImports,
    HlmSpinner,
    HlmToggleImports,
    HlmToggleGroupImports,
    FilterChips,
    StatusChip,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ds-actions.component.html',
  styleUrl: './ds-actions.component.scss',
})
export class DsActions {
  protected readonly statuses = STATUSES;
  protected readonly loading = signal(false);

  protected readonly statusFilters: readonly FilterChipItem[] = [
    { value: 'all', label: 'ทั้งหมด', count: 146 },
    { value: 'pending', label: 'รอดำเนินการ', count: 12 },
    { value: 'in-transit', label: 'ระหว่างขนส่ง', count: 36 },
    { value: 'delivered', label: 'จัดส่งแล้ว', count: 98 },
  ];

  protected readonly statusFilter = 'all';

  protected simulateLoad(): void {
    this.loading.set(true);
    setTimeout(() => this.loading.set(false), 1800);
  }
}
