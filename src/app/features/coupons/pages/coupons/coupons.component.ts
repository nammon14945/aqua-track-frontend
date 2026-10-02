import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

import { PageHeader } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-coupons',
  imports: [NgIcon, PageHeader],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './coupons.component.html',
  styleUrl: './coupons.component.scss',
})
export class Coupons {}
