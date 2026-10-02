import { BrnDialogRef } from '@spartan-ng/brain/dialog';
import { vi } from 'vitest';
import { renderComponent } from '../../../../shared/testing/render-component.util';
import { DsConfirmStockDialog } from './ds-confirm-stock-dialog.component';

describe('DsConfirmStockDialog', () => {
  it('renders the confirm card and closes with true', async () => {
    const close = vi.fn();
    const fixture = await renderComponent(DsConfirmStockDialog, {
      providers: [{ provide: BrnDialogRef, useValue: { close } }],
    });

    const el = fixture.nativeElement as HTMLElement;
    expect(el.textContent).toContain('ยืนยันการตัดสต็อก');

    const confirm = Array.from(el.querySelectorAll('button')).find((button) =>
      button.textContent?.includes('ยืนยัน'),
    );
    confirm?.click();
    expect(close).toHaveBeenCalledWith(true);
  });
});
