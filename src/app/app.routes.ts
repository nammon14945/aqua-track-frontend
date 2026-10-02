import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'design-system',
  },
  {
    path: 'design-system',
    loadChildren: () =>
      import('./features/design-system/design-system.routes').then((m) => m.designSystemRoutes),
  },
  {
    path: '**',
    redirectTo: 'design-system',
  },
];
