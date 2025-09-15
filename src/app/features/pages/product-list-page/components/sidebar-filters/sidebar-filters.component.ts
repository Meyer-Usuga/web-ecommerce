import { Component, computed, effect, inject, output, signal } from '@angular/core';
import { BoxButtonType } from '@interface/enums';
import { BoxButtonComponent } from '@shared/box-button';
import { AccordionComponent } from '../accordion';
import { AccordionItemComponent } from '../accordion-item';
import { FiltersService } from '@interface/services';
import { Filters, FilterValue, ActiveFilters } from '@interface/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-filters',
  imports: [BoxButtonComponent, AccordionComponent, AccordionItemComponent],
  standalone: true,
  templateUrl: './sidebar-filters.component.html',
  styleUrl: './sidebar-filters.component.scss',
})
export class SidebarFiltersComponent {
  readonly selectedFilter = output<FilterValue>();
  readonly #router = inject(Router);
  readonly #filtersService = inject(FiltersService);
  readonly typeControl = BoxButtonType;

  readonly filters = signal<Filters>(
    this.#filtersService.filters
  );
  readonly activeFilters = signal<ActiveFilters>(
    this.#filtersService.activeFilters
  );

  readonly openAccordions = computed(() => {
    const activeFilters = this.activeFilters();
    return Object.keys(activeFilters).filter(
      key => activeFilters[key]?.length
    );
  });

  isActiveFilter(key: string, value: string) {
    const filter: FilterValue = {
      label: key,
      value: value,
    }

    return this.#filtersService.checkActiveFilter(filter)
  }

  onChangeFilter(key: string, value: string) {
    const filter: FilterValue = {
      label: key,
      value: value,
    };

    if (key === 'categoria') {
      this.#onChangeCategory(value);
    } else {
      this.selectedFilter.emit(filter);
    }
  }

  isActiveGender(value: string) {
    return this.#router.url.includes(value);
  }

  checkStateAccordion(key: string){
    const openAccordions = this.openAccordions();
    const typeAccordion = openAccordions.includes(key);

    return typeAccordion || false; 
  }

  #onChangeCategory(value: string) {
    this.#router.navigate([`/productos/${value}`], {
      queryParamsHandling: 'preserve',
    });
  }
}
