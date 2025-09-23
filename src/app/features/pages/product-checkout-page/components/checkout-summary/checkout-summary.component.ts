import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { TransformProductImagePipe } from '@interface/pipes';
import { CartService } from '@interface/services';
import { ButtonComponent } from '@shared/button';

@Component({
  selector: 'app-checkout-summary',
  imports: [TransformProductImagePipe, ButtonComponent, CurrencyPipe],
  standalone: true,
  templateUrl: './checkout-summary.component.html',
  styleUrl: './checkout-summary.component.scss',
})
export class CheckoutSummaryComponent {
  readonly #cartService = inject(CartService);
  readonly cart = this.#cartService.cart;
  readonly total = this.#cartService.total;

  onRemoveProduct(productId: string) {
    this.#cartService.removeProduct(productId);
  }
}
