import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'catalog'
  },
  {
    path: 'login',
    loadComponent: () => import('./feature/auth/login/login').then((m) => m.Login)
  },
  {
    path: 'catalog',
    loadComponent: () => import('./feature/catalog/catalog').then((m) => m.Catalog)
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./feature/admin/layout/admin-layout').then((m) => m.AdminLayout),
    children: [
      {
        path: '',
        loadComponent: () => import('./feature/admin/dashboard/dashboard').then((m) => m.Dashboard)
      },
      {
        path: 'products',
        loadComponent: () => import('./feature/admin/products/products').then((m) => m.Products)
      },
      {
        path: 'products/new',
        loadComponent: () => import('./feature/admin/products/product-form/product-form').then((m) => m.ProductForm)
      },
      {
        path: 'products/:id/edit',
        loadComponent: () => import('./feature/admin/products/product-form/product-form').then((m) => m.ProductForm)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'catalog'
  }
];
