import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

import { PageHeader } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-orders',
  imports: [NgIcon, PageHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class Orders {}
