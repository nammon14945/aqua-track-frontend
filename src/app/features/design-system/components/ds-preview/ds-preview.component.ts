import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'app-ds-preview',
  imports: [NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  templateUrl: './ds-preview.component.html',
  styleUrl: './ds-preview.component.scss',
})
export class DsPreview {
  public readonly title = input.required<string>();
  public readonly description = input<string | null>(null);
  public readonly code = input<string | null>(null);
  public readonly codeLabel = input('ตัวอย่างโค้ด');
  public readonly padded = input(true);

  protected readonly copied = signal(false);

  protected readonly _bodyClass = () =>
    this.padded() ? 'flex flex-wrap items-center gap-2 p-4' : 'flex flex-wrap items-center gap-2';

  protected async copy(): Promise<void> {
    const code = this.code();
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }
}
