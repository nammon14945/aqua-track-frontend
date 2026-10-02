import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.Dashboard),
    title: 'แดชบอร์ด · AquaTrack Pro',
  },
];
