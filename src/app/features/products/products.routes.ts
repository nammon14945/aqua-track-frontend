import { Routes } from '@angular/router';

export const productsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/products/products.component').then((m) => m.Products),
    title: 'สินค้า & ราคา · AquaTrack Pro',
  },
];
