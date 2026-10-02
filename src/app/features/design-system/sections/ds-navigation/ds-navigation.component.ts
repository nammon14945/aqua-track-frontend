import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { HlmAccordionImports } from '@spartan-ng/helm/accordion';
import { HlmBreadcrumbImports } from '@spartan-ng/helm/breadcrumb';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCollapsibleImports } from '@spartan-ng/helm/collapsible';
import { HlmDropdownMenuImports } from '@spartan-ng/helm/dropdown-menu';
import { HlmTabsImports } from '@spartan-ng/helm/tabs';
import { DsPreview } from '../../components/ds-preview/ds-preview.component';
import { DsSection } from '../../components/ds-section/ds-section.component';

@Component({
  selector: 'app-ds-navigation',
  imports: [
    DsSection,
    DsPreview,
    RouterLink,
    NgIcon,
    HlmAccordionImports,
    HlmBreadcrumbImports,
    HlmButtonImports,
    HlmCollapsibleImports,
    HlmDropdownMenuImports,
    HlmTabsImports,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ds-navigation.component.html',
  styleUrl: './ds-navigation.component.scss',
})
export class DsNavigation {}
