import { Routes } from '@angular/router';

export const inventoryRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/inventory/inventory.component').then((m) => m.Inventory),
    title: 'คลังสินค้า · AquaTrack Pro',
  },
];
