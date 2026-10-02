import { Routes } from '@angular/router';

export const designSystemRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/design-system/design-system.component').then((m) => m.DesignSystem),
    title: 'Design System · AquaTrack Pro',
  },
];
