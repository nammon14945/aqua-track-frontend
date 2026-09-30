import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-ds-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <section [id]="id()" class="scroll-mt-20 border-t pt-10 first:border-t-0 first:pt-0">
      <header class="mb-6 flex flex-col gap-1.5">
        <span class="text-caption text-brand-700 font-semibold uppercase tracking-wider">
          {{ eyebrow() }}
        </span>
        <h2 class="text-h2">{{ title() }}</h2>
        @if (description()) {
          <p class="text-body text-muted-foreground max-w-3xl">{{ description() }}</p>
        }
      </header>
      <div class="flex flex-col gap-8">
        <ng-content />
      </div>
    </section>
  `,
})
export class DsSection {
  public readonly id = input.required<string>();
  public readonly title = input.required<string>();
  public readonly eyebrow = input('Section');
  public readonly description = input<string | null>(null);
}
