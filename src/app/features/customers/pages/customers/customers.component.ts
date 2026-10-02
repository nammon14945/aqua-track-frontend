import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

import { PageHeader } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-customers',
  imports: [NgIcon, PageHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss',
})
export class Customers {}
