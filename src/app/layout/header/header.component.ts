import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { HlmPopoverImports } from '@spartan-ng/helm/popover';
import { HlmSidebarImports } from '@spartan-ng/helm/sidebar';

import { CURRENT_USER } from '../../core/models/user.model';
import { ThemeToggle } from '../../shared/components/theme-toggle/theme-toggle.component';
import {
  MOCK_NOTIFICATIONS,
  MOCK_SEARCH_RESULTS,
  NOTIFICATION_BADGE_COUNT,
  RECENT_SEARCHES,
  type AppNotification,
  type NotificationTone,
  type SearchResultTagTone,
  type SearchResultTone,
} from './header.model';

interface HighlightPart {
  readonly text: string;
  readonly match: boolean;
}

@Component({
  selector: 'app-header',
  imports: [NgIcon, ThemeToggle, HlmPopoverImports, HlmSidebarImports],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'contents' },
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class Header {
  protected readonly user = CURRENT_USER;

  protected readonly query = signal('');
  protected readonly searchOpen = signal(false);
  protected readonly notificationsOpen = signal(false);

  protected readonly notifications: readonly AppNotification[] = MOCK_NOTIFICATIONS;
  protected readonly recentSearches = RECENT_SEARCHES;
  protected readonly notificationBadge = NOTIFICATION_BADGE_COUNT;

  protected readonly filteredResults = computed(() => {
    const term = this.query().trim().toLowerCase();
    if (!term) return [];
    return MOCK_SEARCH_RESULTS.filter(
      (item) => item.title.toLowerCase().includes(term) || item.meta.toLowerCase().includes(term),
    );
  });

  protected readonly notificationToneStyles: Record<
    NotificationTone,
    { readonly bar: string; readonly icon: string }
  > = {
    info: { bar: 'bg-info', icon: 'bg-info-soft text-info-soft-foreground' },
    warning: { bar: 'bg-warning', icon: 'bg-warning-soft text-warning-soft-foreground' },
    success: { bar: 'bg-success', icon: 'bg-success-soft text-success-soft-foreground' },
  };

  protected readonly searchIconStyles: Record<SearchResultTone, string> = {
    info: 'bg-info-soft text-info-soft-foreground',
    warning: 'bg-warning-soft text-warning-soft-foreground',
    neutral: 'bg-muted text-muted-foreground',
  };

  protected readonly searchTagStyles: Record<SearchResultTagTone, string> = {
    success: 'bg-success-soft text-success-soft-foreground border border-success-border',
    info: 'bg-info-soft text-info-soft-foreground',
    neutral: 'bg-muted text-muted-foreground',
  };

  protected onSearchInput(event: Event): void {
    this.query.set((event.target as HTMLInputElement).value);
    this.searchOpen.set(true);
  }

  protected clearSearch(): void {
    this.query.set('');
    this.searchOpen.set(true);
  }

  protected closeSearch(): void {
    this.searchOpen.set(false);
  }

  /** แยกข้อความตามคำค้นเพื่อไฮไลต์ส่วนที่ตรงกัน (แสดงผลด้วย <mark>) */
  protected highlight(text: string): readonly HighlightPart[] {
    const term = this.query().trim();
    if (!term) return [{ text, match: false }];

    const index = text.toLowerCase().indexOf(term.toLowerCase());
    if (index === -1) return [{ text, match: false }];

    return [
      { text: text.slice(0, index), match: false },
      { text: text.slice(index, index + term.length), match: true },
      { text: text.slice(index + term.length), match: false },
    ].filter((part) => part.text.length > 0);
  }
}
