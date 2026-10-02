import { Routes } from '@angular/router';

export const financeRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/finance/finance.component').then((m) => m.Finance),
    title: 'การเงิน & ลูกหนี้ · AquaTrack Pro',
  },
];
