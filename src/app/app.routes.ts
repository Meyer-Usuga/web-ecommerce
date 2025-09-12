import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('@feature/home').then((m) => m.HomeComponent),
  },
  {
    path: 'productos/:gender',
    loadComponent: () =>
      import('@feature/product-list-page').then(
        (m) => m.ProductListPageComponent
      ),
  },
];
