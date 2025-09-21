import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import {
  ActiveFilters,
  CartItem,
  FilterValue,
  Product,
} from '@interface/interfaces';
import { NavbarComponent } from '@shared/navbar';
import { ButtonComponent } from '@shared/button';
import { CartService, FiltersService } from '@interface/services';
import { BoxButtonComponent } from '@shared/box-button';
import { BoxButtonSize, BoxButtonType } from '@interface/enums';
import {
  ProductGalleryComponent,
  SampleProductColorComponent,
  SampleProductSizeComponent,
} from './components';
import { TransformCasePipe } from '@interface/pipes';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail-page',
  imports: [
    NavbarComponent,
    ButtonComponent,
    BoxButtonComponent,
    ProductGalleryComponent,
    SampleProductSizeComponent,
    SampleProductColorComponent,
    TransformCasePipe,
    CurrencyPipe,
  ],
  standalone: true,
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss',
})
export class ProductDetailPageComponent {
  readonly id = input.required<string | undefined>();

  readonly #router = inject(Router);
  readonly #cartService = inject(CartService);
  readonly #filtersService = inject(FiltersService);
  readonly product = signal<Product | undefined>(undefined);
  readonly activeFilters = signal<ActiveFilters>(
    this.#filtersService.activeFilters
  );
  readonly selectedFilters = signal<FilterValue[] | undefined>([]);

  readonly typeControl = BoxButtonType;
  readonly sizeControl = BoxButtonSize;

  constructor() {
    effect(() => {
      const id = this.id();
      const product = this.#filtersService.getProductById(id);
      this.product.set(product);
      this.selectedFilters.set(
        this.#filtersService.getActiveFiltersFromQueryParams(id)
      );
    });
  }

  #saveCart() {
    const product = this.product();
    const size = this.selectedFilters()?.[0]?.value;
    const color = this.selectedFilters()?.[1]?.value;

    if (!product || !size || !color) {
      return;
    }

    const cartItem: CartItem = {
      ...product,
      sizeSelected: size,
      colorSelected: color,
      quantity: 1,
    };

    this.#cartService.saveProduct(cartItem);
  }

  onChangeSampleImage() {}

  onSelectFilter(filter: FilterValue) {
    const activeSingleValue = true;
    this.#filtersService.updateQueryParams(filter, activeSingleValue);
  }

  redirecToCheckout() {
    this.#saveCart();
    this.#router.navigate(['/productos/pago', this.id()]);
  }
}
