import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BrnDialogRef } from '@spartan-ng/brain/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';

@Component({
  selector: 'app-ds-confirm-stock-dialog',
  imports: [HlmButtonImports, HlmDialogImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ds-confirm-stock-dialog.component.html',
  styleUrl: './ds-confirm-stock-dialog.component.scss',
})
export class DsConfirmStockDialog {
  private readonly _dialogRef = inject(BrnDialogRef);

  protected confirm(): void {
    this._dialogRef.close(true);
  }
}
