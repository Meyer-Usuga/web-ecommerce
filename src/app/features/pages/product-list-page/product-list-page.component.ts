import { Component, inject, Signal, signal } from '@angular/core';
import { NavbarComponent } from '@shared/navbar';
import { SidebarFiltersComponent } from './components';
import { FooterComponent } from '@shared/footer';
import { SearchInputComponent } from '@shared/search-input';
import { BreadcrumbComponent } from '@shared/breadcrumb';
import { BoxButtonComponent } from '@shared/box-button';
import { BoxButtonSize, BoxButtonType } from '@interface/enums';
import { Filters, FilterValue, Product } from '@interface/interfaces';
import { ProductComponent } from '@shared/product';
import { FiltersService } from '@services/filters.service';

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
  readonly #filtersService = inject(FiltersService);

  readonly typeControl = BoxButtonType;
  readonly sizeControl = BoxButtonSize;

  readonly filters = signal<Filters>(this.#filtersService.filters);

  readonly products = this.#filtersService.products;

  isActiveFilter(key: string, value: string) {
    const filter: FilterValue = {
      label: key,
      value: value,
    };

    return this.#filtersService.checkActiveFilter(filter);
  }

  onSelectFilter(filter: FilterValue) {
    this.#filtersService.updateQueryParams(filter);
  }
}
