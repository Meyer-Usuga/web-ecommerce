import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '@interface/services';

export const checkoutGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cartService = inject(CartService);

  const cart = cartService.cart;
  const paramId = route.params['id'];
  const isProductInCart = cart().items.some((item) => item.id === paramId);

  if (typeof localStorage == 'undefined') {
    return false;
  }

  if (!cart().items.length || !isProductInCart) {
    router.navigate(['/productos/hombre']);
    return false;
  }

  return true;
};
