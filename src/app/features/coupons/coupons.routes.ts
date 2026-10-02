import { Routes } from '@angular/router';

export const couponsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/coupons/coupons.component').then((m) => m.Coupons),
    title: 'คูปอง & สมาชิก · AquaTrack Pro',
  },
];
