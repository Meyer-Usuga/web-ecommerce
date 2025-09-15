import { inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
} from '@angular/router';
import { ActiveFilters, Filters, FilterValue } from '@interface/interfaces';
import { filter, map, Observable, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  readonly #router = inject(Router);
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #activeFilters = toSignal(
    this.#router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd),
      map(() => this.#mapParams(this.#activatedRoute.snapshot.queryParamMap)),
      startWith(this.#mapParams(this.#activatedRoute.snapshot.queryParamMap))
    )
  );

  readonly #listFilters: Filters = {
    sizes: [
      { label: 'XS', value: 'XS' },
      { label: 'S', value: 'S' },
      { label: 'M', value: 'M' },
      { label: 'L', value: 'L' },
      { label: 'XL', value: 'XL' },
      { label: '2X', value: '2X' },
    ],
    colors: [
      { label: 'Azul', value: 'azul' },
      { label: 'Rojo', value: 'rojo' },
      { label: 'Negro', value: 'negro' },
      { label: 'Naranja', value: 'naranja' },
      { label: 'Blanco', value: 'blanco' },
    ],
    collections: [
      { label: 'Buzos', value: 'buzos' },
      { label: 'Camisas', value: 'camisas' },
      { label: 'Chaquetas', value: 'chaquetas' },
      { label: 'Polos', value: 'polos' },
      { label: 'Pantalones', value: 'pantalones' },
      { label: 'Más vendido', value: 'mas_vendido' },
    ],
    categories: [
      { label: 'Hombre', value: 'hombre' },
      { label: 'Mujer', value: 'mujer' },
      { label: 'Nuevo', value: 'nuevo' },
    ],
    availability: [
      { label: 'Disponible', value: 'disponible' },
      {
        label: 'No disponible',
        value: 'no_disponible',
      },
    ],
    prices: [
      {
        label: '90.000 - 120.000',
        value: '90.000-120.000',
      },
      {
        label: '120.000 - 150.000',
        value: '120.000-150.000',
      },
      {
        label: '150.000 - 180.000',
        value: '150.000-180.000',
      },
      {
        label: '180.000 - 210.000',
        value: '180.000-210.000',
      },
      { label: '> 210.000', value: '>210.000' },
    ],
    ratings: [
      { label: '1 estrella', value: '1' },
      { label: '2 estrellas', value: '2' },
      { label: '3 estrellas', value: '3' },
      { label: '4 estrellas', value: '4' },
      { label: '5 estrellas', value: '5' },
    ],
  };

  constructor() {}

  get filters(): Filters {
    return this.#listFilters;
  }

  get activeFilters(): ActiveFilters {
    return this.#activeFilters() ?? {};
  }

  #mapParams(map: ParamMap): ActiveFilters {
    const result: ActiveFilters = {};
    for (const key of map.keys) {
      result[key] = map.getAll(key);
    }
    return result;
  }

  updateQueryParams(filter: FilterValue) {
    const { label, value } = filter;

    const current = this.#activatedRoute.snapshot.queryParamMap.getAll(label);

    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];

    this.#router.navigate([], {
      queryParams: { [label]: updated },
      queryParamsHandling: 'merge',
    });
  }

  checkActiveFilter(filter: FilterValue) {
    const { label, value } = filter;
    const typeFilter = this.activeFilters[label];

    if (typeFilter?.includes(value)) {
      return true;
    }

    return false;
  }
}
