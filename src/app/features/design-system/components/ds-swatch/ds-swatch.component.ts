import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-ds-swatch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  templateUrl: './ds-swatch.component.html',
  styleUrl: './ds-swatch.component.scss',
})
export class DsSwatch {
  public readonly name = input.required<string>();
  public readonly value = input.required<string>();
  public readonly swatchClass = input.required<string>();
  public readonly usage = input<string | null>(null);
}
