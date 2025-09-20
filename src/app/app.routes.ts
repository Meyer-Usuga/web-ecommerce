import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
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
  {
    path: 'productos/detalle/:id',
    loadComponent: () =>
      import('@feature/pages/product-detail-page').then(
        (c) => c.ProductDetailPageComponent
      ),
  },
  {
    path: 'productos/pago/:id',
    loadComponent: () =>
      import('@feature/pages/product-checkout-page').then(
        (c) => c.ProductCheckoutPageComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
