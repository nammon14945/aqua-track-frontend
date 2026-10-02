import { Routes } from '@angular/router';

export const customersRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/customers/customers.component').then((m) => m.Customers),
    title: 'ลูกค้า · AquaTrack Pro',
  },
];
