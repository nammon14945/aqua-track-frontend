import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-ds-swatch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div class="flex flex-col gap-1.5">
      <div
        [class]="swatchClass()"
        class="h-14 w-full rounded-lg border border-black/5 shadow-soft-xs dark:border-white/10"
      ></div>
      <div class="flex flex-col">
        <span class="text-body-sm font-medium">{{ name() }}</span>
        <span class="text-caption text-muted-foreground font-mono">{{ value() }}</span>
        @if (usage()) {
          <span class="text-caption text-muted-foreground">{{ usage() }}</span>
        }
      </div>
    </div>
  `,
})
export class DsSwatch {
  public readonly name = input.required<string>();
  public readonly value = input.required<string>();
  public readonly swatchClass = input.required<string>();
  public readonly usage = input<string | null>(null);
}
