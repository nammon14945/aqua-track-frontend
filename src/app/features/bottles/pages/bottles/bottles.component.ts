import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

import { PageHeader } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-bottles',
  imports: [NgIcon, PageHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './bottles.component.html',
  styleUrl: './bottles.component.scss',
})
export class Bottles {}
