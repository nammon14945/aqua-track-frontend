import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { toast } from '@spartan-ng/brain/sonner';
import { HlmAlertDialogImports } from '@spartan-ng/helm/alert-dialog';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports, HlmDialogService } from '@spartan-ng/helm/dialog';
import { HlmDrawerImports } from '@spartan-ng/helm/drawer';
import { HlmHoverCardImports } from '@spartan-ng/helm/hover-card';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmPopoverImports } from '@spartan-ng/helm/popover';
import { HlmSheetImports } from '@spartan-ng/helm/sheet';
import { HlmTooltipImports } from '@spartan-ng/helm/tooltip';
import { DsPreview } from '../../components/ds-preview/ds-preview.component';
import { DsSection } from '../../components/ds-section/ds-section.component';
import { DsConfirmStockDialog } from '../ds-confirm-stock-dialog/ds-confirm-stock-dialog.component';

@Component({
  selector: 'app-ds-feedback',
  imports: [
    DsSection,
    DsPreview,
    NgIcon,
    HlmAlertDialogImports,
    HlmAlertImports,
    HlmButtonImports,
    HlmDialogImports,
    HlmDrawerImports,
    HlmHoverCardImports,
    HlmInputImports,
    HlmPopoverImports,
    HlmSheetImports,
    HlmTooltipImports,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ds-feedback.component.html',
  styleUrl: './ds-feedback.component.scss',
})
export class DsFeedback {
  private readonly _dialogService = inject(HlmDialogService);

  protected readonly toast = toast;

  protected notifySaved(): void {
    toast.success('บันทึกเรียบร้อย', { description: 'ข้อมูลถูกอัปเดตแล้ว' });
  }

  protected notifyCancelled(): void {
    toast.error('ยกเลิกออเดอร์แล้ว', { description: 'ถังถูกคืนเข้าสต็อกเรียบร้อย' });
  }

  protected openDialog(): void {
    this._dialogService
      .open<boolean>(DsConfirmStockDialog, { contentClass: 'sm:max-w-sm' })
      .closed$.subscribe((confirmed) => {
        if (confirmed) {
          this.notifySaved();
        }
      });
  }
}
