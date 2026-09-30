import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <header class="flex flex-col gap-3 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div class="flex flex-col gap-1">
        @if (eyebrow()) {
          <span class="text-caption text-brand-700 font-medium uppercase tracking-wide">
            {{ eyebrow() }}
          </span>
        }
        <h1 class="text-h2 text-foreground">{{ title() }}</h1>
        @if (description()) {
          <p class="text-body text-muted-foreground max-w-3xl">{{ description() }}</p>
        }
      </div>
      <div class="flex shrink-0 flex-wrap items-center gap-2">
        <ng-content />
      </div>
    </header>
  `,
})
export class PageHeader {
  public readonly title = input.required<string>();
  public readonly description = input<string | null>(null);
  public readonly eyebrow = input<string | null>(null);
}
