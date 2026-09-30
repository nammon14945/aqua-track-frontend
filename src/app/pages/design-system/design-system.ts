import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { PageHeader } from '../../shared/components/page-header/page-header';
import { ThemeToggle } from '../../shared/components/theme-toggle/theme-toggle';
import { DsActions } from './sections/ds-actions';
import { DsColors } from './sections/ds-colors';
import { DsData } from './sections/ds-data';
import { DsFeedback } from './sections/ds-feedback';
import { DsForms } from './sections/ds-forms';
import { DsNavigation } from './sections/ds-navigation';
import { DsTypography } from './sections/ds-typography';

interface NavGroup {
  readonly label: string;
  readonly items: readonly { readonly id: string; readonly label: string }[];
}

@Component({
  selector: 'app-design-system',
  imports: [
    RouterLink,
    NgIcon,
    HlmButtonImports,
    PageHeader,
    ThemeToggle,
    DsColors,
    DsTypography,
    DsActions,
    DsForms,
    DsData,
    DsNavigation,
    DsFeedback,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="mx-auto flex w-full max-w-[1400px] flex-col gap-8 px-4 py-6 md:px-6 lg:flex-row lg:gap-10"
    >
      <!-- In-page navigation -->
      <aside class="lg:w-64 lg:shrink-0">
        <nav
          class="thin-scrollbar lg:sticky lg:top-24 lg:max-h-[calc(100svh-7rem)] lg:overflow-y-auto"
        >
          <div
            class="bg-card rounded-xl border p-3 shadow-soft-sm lg:bg-transparent lg:p-0 lg:shadow-none lg:border-0"
          >
            <div class="hidden flex-col gap-1 lg:flex">
              <span class="text-caption text-muted-foreground px-2 uppercase tracking-wider">
                Design System
              </span>
              <span class="text-h4 px-2 pb-2">AquaTrack Pro</span>
            </div>

            @for (group of nav; track group.label) {
              <div class="flex flex-col gap-1 py-2">
                <span class="text-caption text-muted-foreground px-2 font-medium">{{
                  group.label
                }}</span>
                @for (item of group.items; track item.id) {
                  <a
                    class="text-body-sm text-muted-foreground hover:bg-muted hover:text-foreground rounded-md px-2 py-1.5 transition-colors"
                    [class.text-foreground]="active() === item.id"
                    [class.font-medium]="active() === item.id"
                    [attr.aria-current]="active() === item.id ? 'true' : null"
                    [href]="'#' + item.id"
                    (click)="active.set(item.id)"
                  >
                    {{ item.label }}
                  </a>
                }
              </div>
            }
          </div>
        </nav>
      </aside>

      <!-- Content -->
      <div class="flex min-w-0 flex-1 flex-col gap-10">
        <app-page-header
          eyebrow="Front-end Foundation"
          title="Design System"
          description="รวม design tokens, reusable components และข้อกำหนดการแสดงผลของระบบจัดการบริษัทผลิตน้ำดื่ม ทุกอย่างอ้างอิงจาก Stitch 'Water Delivery Design System' และพร้อมนำไปใช้ซ้ำในทุกหน้าจอ"
        >
          <a hlmBtn variant="outline" routerLink="/admin/dashboard">
            <ng-icon name="lucideLayoutDashboard" data-icon="inline-start" />
            Admin layout
          </a>
          <app-theme-toggle />
        </app-page-header>

        <div
          class="bg-card flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border p-4 text-body-sm shadow-soft-sm"
        >
          <div class="flex items-center gap-2">
            <span class="bg-brand-600 size-3 rounded-full"></span>
            <span class="font-medium">Primary #0284C7</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="bg-brand-teal-600 size-3 rounded-full"></span>
            <span class="font-medium">Secondary #0D9488</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="bg-brand-amber-500 size-3 rounded-full"></span>
            <span class="font-medium">Tertiary #F59E0B</span>
          </div>
          <div class="text-muted-foreground">Radius 8px · Noto Sans Thai · Light mode เป็นหลัก</div>
        </div>

        <app-ds-colors />
        <app-ds-typography />
        <app-ds-actions />
        <app-ds-forms />
        <app-ds-data />
        <app-ds-navigation />
        <app-ds-feedback />
      </div>
    </div>
  `,
})
export class DesignSystem {
  protected readonly active = signal('colors');

  protected readonly nav: readonly NavGroup[] = [
    {
      label: 'Foundations',
      items: [
        { id: 'colors', label: 'Colors' },
        { id: 'typography', label: 'Typography & Shape' },
      ],
    },
    {
      label: 'Components',
      items: [
        { id: 'actions', label: 'Actions & Indicators' },
        { id: 'forms', label: 'Forms & Inputs' },
        { id: 'data', label: 'Data Display' },
        { id: 'navigation', label: 'Navigation' },
        { id: 'feedback', label: 'Feedback & Overlays' },
      ],
    },
  ];
}
