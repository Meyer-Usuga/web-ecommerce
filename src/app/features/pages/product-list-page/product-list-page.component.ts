import { Component, computed, inject, Signal, signal } from '@angular/core';
import { NavbarComponent } from '@shared/navbar';
import { SidebarFiltersComponent } from './components';
import { FooterComponent } from '@shared/footer';
import { SearchInputComponent } from '@shared/search-input';
import { BreadcrumbComponent } from '@shared/breadcrumb';
import { BoxButtonComponent } from '@shared/box-button';
import { BoxButtonSize, BoxButtonType } from '@interface/enums';
import { Filters, FilterValue } from '@interface/interfaces';
import { ProductComponent } from '@shared/product';
import { FiltersService } from '@services/filters.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list-page',
  imports: [
    NavbarComponent,
    FooterComponent,
    SidebarFiltersComponent,
    SearchInputComponent,
    BreadcrumbComponent,
    BoxButtonComponent,
    ProductComponent,
  ],
  standalone: true,
  templateUrl: './product-list-page.component.html',
  styleUrl: './product-list-page.component.scss',
})
export class ProductListPageComponent {
  readonly #router = inject(Router);
  readonly #filtersService = inject(FiltersService);

  readonly typeControl = BoxButtonType;
  readonly sizeControl = BoxButtonSize;

  readonly filters = signal<Filters>(this.#filtersService.filters);

  readonly query = this.#filtersService.query;

  readonly products = this.#filtersService.products;

  isActiveFilter(key: string, value: string) {
    const filter: FilterValue = {
      label: key,
      value: value,
    };
    return this.#filtersService.checkActiveFilter(filter);
  }

  onSearchText(text: string) {
    const filter = {
      label: 'busqueda',
      value: text,
    };
    this.onSelectFilter(filter);
  }

  onSelectFilter(filter: FilterValue) {
    this.#filtersService.updateQueryParams(filter);
  }

  /** TODO: Al momento de dar click, y cargar en el detalle,
   * setear el size y color activo según los activeFilters,
   * si hay más de 1 filtro activo, tomar el primero,
   * si no hay ninguno, tomar el primer valor disponible del producto.
   * y que el usuario pueda cambiarlo en el detalle.
   */

  redirectToDetail(productId: string) {
    this.#router.navigate(['/productos/detalle', productId], {
      queryParamsHandling: 'preserve',
    });
  }
}
