import { computed, Injectable, signal } from '@angular/core';
import { Cart, CartItem } from '@interface/interfaces';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  readonly #cartKey = 'cart';
  readonly #storage = typeof localStorage !== 'undefined';
  readonly #cart = signal<Cart>(this.#getStorage());

  get cart() {
    return this.#cart.asReadonly();
  }

  #setStorage(product: CartItem) {
    if (!this.#storage) return;

    this.#cart.update((current) => {
      const items = [...current.items];
      const index = items.findIndex((i) => i.id === product.id);

      if (index !== -1) {
        items[index] = product;
        items[index].quantity =
          (items[index].quantity || 1) + (product.quantity || 1);
      } else {
        items.push(product);
      }

      const updated = { items };
      localStorage.setItem(this.#cartKey, JSON.stringify(updated));
      return updated;
    });
  }

  #removeStorage(productId: string) {
    if (!this.#storage) return;

    const cart = this.#cart();
    if (!cart) return;

    const newItems = cart.items.filter((product) => product.id !== productId);

    const updatedCart: Cart = { items: newItems };

    localStorage.setItem(this.#cartKey, JSON.stringify(updatedCart));
    this.#cart.set(updatedCart);
  }

  #getStorage() {
    if (!this.#storage) {
      return { items: [] };
    }
    const cart = localStorage.getItem(this.#cartKey);

    if (!cart) {
      return { items: [] };
    }

    return JSON.parse(cart);
  }

  saveProduct(product: CartItem) {
    this.#setStorage(product);
  }

  removeProduct(productId: string) {
    this.#removeStorage(productId);
  }
}
