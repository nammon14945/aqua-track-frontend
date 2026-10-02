import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PageHeader } from '../../../../shared/components/page-header/page-header.component';
import { ThemeToggle } from '../../../../shared/components/theme-toggle/theme-toggle.component';
import { DsActions } from '../../sections/ds-actions/ds-actions.component';
import { DsColors } from '../../sections/ds-colors/ds-colors.component';
import { DsData } from '../../sections/ds-data/ds-data.component';
import { DsFeedback } from '../../sections/ds-feedback/ds-feedback.component';
import { DsForms } from '../../sections/ds-forms/ds-forms.component';
import { DsNavigation } from '../../sections/ds-navigation/ds-navigation.component';
import { DsTypography } from '../../sections/ds-typography/ds-typography.component';

interface NavGroup {
  readonly label: string;
  readonly items: readonly { readonly id: string; readonly label: string }[];
}

@Component({
  selector: 'app-design-system',
  imports: [
    RouterLink,
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
  templateUrl: './design-system.component.html',
  styleUrl: './design-system.component.scss',
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
