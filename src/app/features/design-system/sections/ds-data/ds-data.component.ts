import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmEmptyImports } from '@spartan-ng/helm/empty';
import { HlmItemImports } from '@spartan-ng/helm/item';
import { HlmPaginationImports } from '@spartan-ng/helm/pagination';
import { HlmSkeleton } from '@spartan-ng/helm/skeleton';
import { HlmSpinner } from '@spartan-ng/helm/spinner';
import { HlmTableImports } from '@spartan-ng/helm/table';
import { BottleCount } from '../../../../shared/components/bottle-count/bottle-count.component';
import { KpiCard } from '../../../../shared/components/kpi-card/kpi-card.component';
import { PaymentChip } from '../../../../shared/components/payment-chip/payment-chip.component';
import { ProgressBar } from '../../../../shared/components/progress-bar/progress-bar.component';
import { RouteProgressRow } from '../../../../shared/components/route-progress-row/route-progress-row.component';
import { RouteStatusCard } from '../../../../shared/components/route-status-card/route-status-card.component';
import { StatusChip } from '../../../../shared/components/status-chip/status-chip.component';
import { ThaiDatePipe } from '../../../../shared/pipes/thai-date.pipe';
import { ThbPipe } from '../../../../shared/pipes/thb.pipe';
import { type ChipStatus } from '../../../../core/models/domain.model';
import { DsPreview } from '../../components/ds-preview/ds-preview.component';
import { DsSection } from '../../components/ds-section/ds-section.component';

interface PackCount {
  readonly cases: number;
  readonly bottles: number;
}

interface OrderRow {
  readonly id: string;
  readonly customer: string;
  readonly address: string;
  readonly delivered: PackCount;
  readonly returned: PackCount;
  readonly amount: number;
  readonly status: ChipStatus;
  readonly date: string;
}

@Component({
  selector: 'app-ds-data',
  imports: [
    DsSection,
    DsPreview,
    NgIcon,
    HlmAvatarImports,
    HlmBadgeImports,
    HlmButtonImports,
    HlmCardImports,
    HlmCheckboxImports,
    HlmEmptyImports,
    HlmItemImports,
    HlmPaginationImports,
    HlmSkeleton,
    HlmSpinner,
    HlmTableImports,
    BottleCount,
    KpiCard,
    PaymentChip,
    ProgressBar,
    RouteProgressRow,
    RouteStatusCard,
    StatusChip,
    ThaiDatePipe,
    ThbPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ds-data.component.html',
  styleUrl: './ds-data.component.scss',
})
export class DsData {
  protected readonly today = new Date();

  protected readonly progressTones = ['brand', 'teal', 'success', 'warning', 'credit'] as const;

  protected readonly orders: readonly OrderRow[] = [
    {
      id: 'ORD-6901',
      customer: 'บ้านคุณสมศรี',
      address: '121/4 หมู่ 3 ต.บางทราย',
      delivered: { cases: 0, bottles: 24 },
      returned: { cases: 0, bottles: 18 },
      amount: 3480,
      status: 'delivered',
      date: '2026-09-17T08:12:00',
    },
    {
      id: 'ORD-6902',
      customer: 'ร้านอาหารครัวไทย',
      address: '88 ถ.สุขุมวิท',
      delivered: { cases: 1, bottles: 120 },
      returned: { cases: 1, bottles: 96 },
      amount: 17400,
      status: 'in-transit',
      date: '2026-09-17T09:05:00',
    },
    {
      id: 'ORD-6903',
      customer: 'ร้านกาแฟบ้านสวน',
      address: '45/2 ต.ในเมือง',
      delivered: { cases: 0, bottles: 36 },
      returned: { cases: 0, bottles: 0 },
      amount: 0,
      status: 'credit',
      date: '2026-09-17T09:40:00',
    },
    {
      id: 'ORD-6904',
      customer: 'อพาร์ทเมนต์สุขใจ',
      address: '9 ซ.5 ต.หนองปรือ',
      delivered: { cases: 2, bottles: 60 },
      returned: { cases: 2, bottles: 60 },
      amount: 8700,
      status: 'pending',
      date: '2026-09-17T10:20:00',
    },
    {
      id: 'ORD-6905',
      customer: 'ร้านข้าวแกงป้าแดง',
      address: '3 ต.ท่าศาลา',
      delivered: { cases: 1, bottles: 2 },
      returned: { cases: 0, bottles: 0 },
      amount: 1740,
      status: 'cancelled',
      date: '2026-09-17T11:02:00',
    },
    {
      id: 'ORD-6906',
      customer: 'บริษัท ก่อสร้างรุ่งเรือง',
      address: '99 แขวงบางนา',
      delivered: { cases: 0, bottles: 240 },
      returned: { cases: 0, bottles: 200 },
      amount: 32000,
      status: 'delivered',
      date: '2026-09-17T13:15:00',
    },
  ];

  protected readonly totals = computed(() =>
    this.orders.reduce(
      (acc, row) => ({
        deliveredCases: acc.deliveredCases + row.delivered.cases,
        deliveredBottles: acc.deliveredBottles + row.delivered.bottles,
        returnedCases: acc.returnedCases + row.returned.cases,
        returnedBottles: acc.returnedBottles + row.returned.bottles,
        amount: acc.amount + row.amount,
      }),
      { deliveredCases: 0, deliveredBottles: 0, returnedCases: 0, returnedBottles: 0, amount: 0 },
    ),
  );
}
