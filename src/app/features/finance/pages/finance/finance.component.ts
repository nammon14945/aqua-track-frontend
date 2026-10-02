import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

import { PageHeader } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-finance',
  imports: [NgIcon, PageHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.scss',
})
export class Finance {}
