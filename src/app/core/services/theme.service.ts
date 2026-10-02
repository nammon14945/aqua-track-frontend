import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';

const STORAGE_KEY = 'water-theme';

export type ThemeMode = 'light' | 'dark';

/**
 * จัดการ light/dark theme ระดับแอป (singleton)
 * Light เป็นค่าเริ่มต้น — จะเปลี่ยนเป็น dark เมื่อผู้ใช้เลือกเองเท่านั้น
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _document = inject(DOCUMENT);

  readonly isDark = signal(this._document.documentElement.classList.contains('dark'));

  constructor() {
    this.apply(this.read() ?? 'light');
  }

  toggle(): void {
    this.apply(this.isDark() ? 'light' : 'dark');
  }

  apply(theme: ThemeMode): void {
    this._document.documentElement.classList.toggle('dark', theme === 'dark');
    this.isDark.set(theme === 'dark');
    try {
      this._document.defaultView?.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // storage unavailable — ignore
    }
  }

  private read(): ThemeMode | null {
    try {
      const value = this._document.defaultView?.localStorage.getItem(STORAGE_KEY);
      return value === 'dark' || value === 'light' ? value : null;
    } catch {
      return null;
    }
  }
}
