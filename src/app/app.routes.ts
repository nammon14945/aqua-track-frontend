import { Routes } from '@angular/router';

/**
 * ทุกหน้าในระบบอยู่ใต้ MainLayout (sidebar + header shell) — โหลดแบบ lazy
 * - '' → แดชบอร์ด (เมนูแรกของ sidebar)
 * - ฟีเจอร์ P1–P8 เป็น stub page "อยู่ระหว่างพัฒนา" รอเปิดใช้งานจริงตาม docs/08
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout.component').then((m) => m.MainLayout),
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then((m) => m.dashboardRoutes),
      },
      {
        path: 'orders',
        loadChildren: () => import('./features/orders/orders.routes').then((m) => m.ordersRoutes),
      },
      {
        path: 'bottles',
        loadChildren: () =>
          import('./features/bottles/bottles.routes').then((m) => m.bottlesRoutes),
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('./features/inventory/inventory.routes').then((m) => m.inventoryRoutes),
      },
      {
        path: 'finance',
        loadChildren: () =>
          import('./features/finance/finance.routes').then((m) => m.financeRoutes),
      },
      {
        path: 'coupons',
        loadChildren: () =>
          import('./features/coupons/coupons.routes').then((m) => m.couponsRoutes),
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./features/customers/customers.routes').then((m) => m.customersRoutes),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./features/products/products.routes').then((m) => m.productsRoutes),
      },
      {
        path: 'design-system',
        loadChildren: () =>
          import('./features/design-system/design-system.routes').then((m) => m.designSystemRoutes),
      },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];
