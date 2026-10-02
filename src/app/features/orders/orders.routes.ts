import { Routes } from '@angular/router';

export const ordersRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/orders/orders.component').then((m) => m.Orders),
    title: 'ออเดอร์ & สายรถส่งน้ำ · AquaTrack Pro',
  },
];
