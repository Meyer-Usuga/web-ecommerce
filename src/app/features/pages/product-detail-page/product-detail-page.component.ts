import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { ActiveFilters, Product } from '@interface/interfaces';
import { NavbarComponent } from '@shared/navbar';
import { ButtonComponent } from '@shared/button';
import { FiltersService } from '@interface/services';
import { BoxButtonComponent } from '@shared/box-button';
import { BoxButtonSize, BoxButtonType } from '@interface/enums';
import {
  ProductGalleryComponent,
  SampleProductColorComponent,
  SampleProductSizeComponent,
} from './components';
import { TransformCasePipe } from '@interface/pipes';

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
  ],
  standalone: true,
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss',
})
export class ProductDetailPageComponent {
  readonly id = input.required<string | undefined>();

  readonly #filtersService = inject(FiltersService);
  readonly product = signal<Product | undefined>(undefined);
  readonly activeFilters = signal<ActiveFilters>(
    this.#filtersService.activeFilters
  );

  readonly typeControl = BoxButtonType;
  readonly sizeControl = BoxButtonSize;

  constructor() {
    effect(() => {
      const id = this.id();
      const product = this.#filtersService.getProductById(id);
      this.product.set(product);
    });
  }

  onChangeSampleImage() {}
}
