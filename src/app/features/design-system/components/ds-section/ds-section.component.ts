import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-ds-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  templateUrl: './ds-section.component.html',
  styleUrl: './ds-section.component.scss',
})
export class DsSection {
  public readonly id = input.required<string>();
  public readonly title = input.required<string>();
  public readonly eyebrow = input('Section');
  public readonly description = input<string | null>(null);
}
