import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BrnDialogRef } from '@spartan-ng/brain/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';

@Component({
  selector: 'app-ds-confirm-stock-dialog',
  imports: [HlmButtonImports, HlmDialogImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <hlm-dialog-header>
      <h3 hlmDialogTitle>ยืนยันการตัดสต็อก</h3>
      <p hlmDialogDescription>ระบบจะตัดสต็อกทันทีหลังยืนยัน</p>
    </hlm-dialog-header>
    <hlm-dialog-footer>
      <button hlmBtn variant="outline" hlmDialogClose>ยกเลิก</button>
      <button hlmBtn (click)="confirm()">ยืนยัน</button>
    </hlm-dialog-footer>
  `,
})
export class DsConfirmStockDialog {
  private readonly _dialogRef = inject(BrnDialogRef);

  protected confirm(): void {
    this._dialogRef.close(true);
  }
}
