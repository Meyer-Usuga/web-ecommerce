import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@feature/pages/home').then((c) => c.HomeComponent),
  },
  {
    path: 'productos/:collection',
    loadComponent: () =>
      import('@feature/pages/product-list-page').then(
        (c) => c.ProductListPageComponent
      ),
  },
];
