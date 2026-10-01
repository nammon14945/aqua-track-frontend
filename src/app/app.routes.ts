import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'design-system',
  },
  {
    path: 'design-system',
    loadComponent: () => import('./pages/design-system/design-system').then((m) => m.DesignSystem),
    title: 'Design System · AquaTrack Pro',
  },
  {
    path: '**',
    redirectTo: 'design-system',
  },
];
