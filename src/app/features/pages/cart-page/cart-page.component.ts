import { CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { BoxButtonSize, BoxButtonType, StepsEnum } from '@interface/enums';
import { CartItem, Steps } from '@interface/interfaces';
import { TransformCartItemPipe } from '@interface/pipes';
import { CartService } from '@interface/services';
import { BoxButtonComponent } from '@shared/box-button';
import { NavbarComponent } from '@shared/navbar';
import { ProductComponent } from '@shared/product';
import { StepsComponent } from '@shared/steps';
import { EmptyCartComponent, ProductControlsComponent } from './components';

@Component({
  selector: 'app-cart-page',
  imports: [
    NavbarComponent,
    StepsComponent,
    ProductComponent,
    TransformCartItemPipe,
    BoxButtonComponent,
    EmptyCartComponent,
    ProductControlsComponent,
    CurrencyPipe,
  ],
  standalone: true,
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
  readonly #cartService = inject(CartService);
  readonly cart = this.#cartService.cart;
  readonly total = this.#cartService.total;
  readonly acceptTerms = signal(false);

  readonly typeControl = BoxButtonType;
  readonly sizeControl = BoxButtonSize;
  readonly listSteps: Steps[] = [
    {
      step: StepsEnum.SHOPPING_BAG,
      label: 'Carrito',
      active: true,
    },
    {
      step: StepsEnum.FAVOURITES,
      label: 'Favoritos',
      active: false,
    },
  ];

  onChangeStep(step: StepsEnum) {
    this.listSteps.forEach((s) => (s.active = s.step === step));
  }

  handleTerms() {
    this.acceptTerms.update((prev) => !prev);
  }

  onRemoveProduct(id: string) {
    this.#cartService.removeProduct(id);
  }

  onSaveProduct(item: CartItem) {
    this.#cartService.saveProduct(item);
  }
}
