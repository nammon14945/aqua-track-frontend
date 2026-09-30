import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

const STORAGE_KEY = 'water-theme';

@Component({
  selector: 'app-theme-toggle',
  imports: [NgIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  template: `
    <button
      type="button"
      class="border-border bg-background text-foreground hover:bg-muted inline-flex size-8 items-center justify-center rounded-lg border transition-colors [&_ng-icon]:text-[length:--spacing(4)]"
      [attr.aria-label]="isDark() ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด'"
      (click)="toggle()"
    >
      <ng-icon [name]="isDark() ? 'lucideSun' : 'lucideMoon'" />
    </button>
  `,
})
export class ThemeToggle {
  private readonly _document = inject(DOCUMENT);

  protected readonly isDark = signal(this._document.documentElement.classList.contains('dark'));

  constructor() {
    // Light mode เป็นค่าเริ่มต้นของระบบ (ตาม Design Guidelines)
    // จะเปลี่ยนเป็น dark ก็ต่อเมื่อผู้ใช้เลือกเองเท่านั้น
    this._apply(this._read() ?? 'light');
  }

  protected toggle(): void {
    this._apply(this.isDark() ? 'light' : 'dark');
  }

  private _apply(theme: 'light' | 'dark'): void {
    this._document.documentElement.classList.toggle('dark', theme === 'dark');
    this.isDark.set(theme === 'dark');
    try {
      this._document.defaultView?.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      /* storage unavailable — ignore */
    }
  }

  private _read(): 'light' | 'dark' | null {
    try {
      const value = this._document.defaultView?.localStorage.getItem(STORAGE_KEY);
      return value === 'dark' || value === 'light' ? value : null;
    } catch {
      return null;
    }
  }
}
