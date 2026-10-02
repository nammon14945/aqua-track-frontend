import { Routes } from '@angular/router';

export const bottlesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/bottles/bottles.component').then((m) => m.Bottles),
    title: 'ถังน้ำเปล่า · AquaTrack Pro',
  },
];
