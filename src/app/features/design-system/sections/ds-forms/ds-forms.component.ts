import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIcon } from '@ng-icons/core';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmDatePickerImports } from '@spartan-ng/helm/date-picker';
import { HlmFieldImports } from '@spartan-ng/helm/field';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmInputGroupImports } from '@spartan-ng/helm/input-group';
import { HlmNativeSelectImports } from '@spartan-ng/helm/native-select';
import { HlmRadioGroupImports } from '@spartan-ng/helm/radio-group';
import { HlmSelectImports } from '@spartan-ng/helm/select';
import { HlmSlider } from '@spartan-ng/helm/slider';
import { HlmSwitchImports } from '@spartan-ng/helm/switch';
import { HlmTextareaImports } from '@spartan-ng/helm/textarea';
import { PaymentModeSelector } from '../../../../shared/components/payment-mode-selector/payment-mode-selector.component';
import { type PaymentMode } from '../../../../core/models/domain.model';
import { DsPreview } from '../../components/ds-preview/ds-preview.component';
import { DsSection } from '../../components/ds-section/ds-section.component';

@Component({
  selector: 'app-ds-forms',
  imports: [
    DsSection,
    DsPreview,
    FormsModule,
    NgIcon,
    HlmCheckboxImports,
    HlmDatePickerImports,
    HlmFieldImports,
    HlmInputImports,
    HlmInputGroupImports,
    HlmNativeSelectImports,
    HlmRadioGroupImports,
    HlmSelectImports,
    HlmSlider,
    HlmSwitchImports,
    HlmTextareaImports,
    PaymentModeSelector,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ds-forms.component.html',
  styleUrl: './ds-forms.component.scss',
})
export class DsForms {
  protected readonly zones = [
    { label: 'โซน A — ตัวเมือง', value: 'a' },
    { label: 'โซน B — ตลาด', value: 'b' },
    { label: 'โซน C — ต่างอำเภอ', value: 'c' },
  ];
  protected readonly trucks = [
    { label: 'รถคันที่ 1', value: '1' },
    { label: 'รถคันที่ 2', value: '2' },
    { label: 'รถคันที่ 3', value: '3' },
  ];

  protected readonly agreeTerms = signal(true);
  protected readonly visitType = signal('regular');
  protected readonly autoPrint = signal(true);
  protected readonly notifyCustomer = signal(false);
  protected readonly stockAlert = signal(40);
  protected readonly paymentMode = signal<PaymentMode>('cash');

  protected readonly zoneToString = (value: string) =>
    this.zones.find((zone) => zone.value === value)?.label ?? '';

  protected readonly thaiDate = (date: Date) =>
    new Intl.DateTimeFormat('th-TH-u-ca-buddhist', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);

  protected onSlider(value: number[]): void {
    this.stockAlert.set(value[0] ?? 0);
  }
}
