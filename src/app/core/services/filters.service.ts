import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
} from '@angular/router';
import {
  ActiveFilters,
  Filters,
  FilterValue,
  Product,
} from '@interface/interfaces';
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

  readonly products = computed(() => {
    const activeFilters = this.#activeFilters();
    return this.#applyFilters(activeFilters);
  });

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
    special: [
      { label: 'Próximamente', value: 'proximamente' },
      { label: 'Edición limitada', value: 'edicion_limitada' },
      { label: 'En descuento', value: 'descuento' },
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

  readonly #products: Product[] = [
    {
      id: 'A-1',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213966/Rectangle_18_1_iacr4a.png',
      alt: 'Nuevo articulo de la semana',
      description: {
        title: 'V-Neck T-Shirt',
        subtitle: 'Embroidered Seersucker Shirt',
        price: '99',
      },
      size: 'M',
      color: 'azul',
      collection: 'camisas',
      special: null,
      category: 'hombre',
      availability: 'disponible',
      rating: '4',
    },
    {
      id: 'A-2',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757911745/Rectangle_3_6_i9w06h.png',
      alt: 'Nuevo articulo de la semana',
      description: {
        title: 'Cotton T Shirt',
        subtitle: 'Basic Slim Fit T-Shirt',
        price: '120',
      },
      size: 'L',
      color: 'negro',
      collection: 'buzos',
      special: 'descuento',
      category: 'mujer',
      availability: 'disponible',
      rating: '5',
    },
    {
      id: 'A-3',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757732159/Rectangle_3_1_mrgtvg.png',
      alt: 'Nuevo articulo de la semana',
      description: {
        title: 'Henley T-Shirt',
        subtitle: 'Blurred Print T-Shirt',
        price: '180',
      },
      size: 'S',
      color: 'rojo',
      collection: 'polos',
      special: 'edicion_limitada',
      category: 'hombre',
      availability: 'no_disponible',
      rating: '3',
    },
    {
      id: 'A-4',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757210225/product4_eqnwzt.png',
      alt: 'Nuevo articulo de la semana',
      description: {
        title: 'Crewneck T-Shirt',
        subtitle: 'Full Sleeve Zipper',
        price: '210',
      },
      size: 'XL',
      color: 'blanco',
      collection: 'chaquetas',
      special: 'proximamente',
      category: 'mujer',
      availability: 'disponible',
      rating: '5',
    },
    {
      id: 'A-5',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213063/product6_nfsobm.png',
      alt: 'Nuevo articulo de la semana',
      description: {
        title: 'Crewneck T-Shirt',
        subtitle: 'Full Sleeve Zipper',
        price: '150',
      },
      size: 'XS',
      color: 'naranja',
      collection: 'pantalones',
      special: null,
      category: 'hombre',
      availability: 'disponible',
      rating: '2',
    },
    {
      id: 'B-1',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757732159/Rectangle_3_1_mrgtvg.png',
      alt: 'Producto especial',
      description: {
        title: 'Basic Hoodie',
        subtitle: 'Casual Wear',
        price: '110',
      },
      size: '2X',
      color: 'negro',
      collection: 'buzos',
      special: 'descuento',
      category: 'mujer',
      availability: 'disponible',
      rating: '5',
    },
    {
      id: 'B-2',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757210225/product4_eqnwzt.png',
      alt: 'Producto especial',
      description: {
        title: 'Slim Fit Polo',
        subtitle: 'Casual Line',
        price: '90',
      },
      size: 'M',
      color: 'rojo',
      collection: 'polos',
      special: 'edicion_limitada',
      category: 'hombre',
      availability: 'no_disponible',
      rating: '4',
    },
    {
      id: 'B-3',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213063/product6_nfsobm.png',
      alt: 'Producto especial',
      description: {
        title: 'Classic Pants',
        subtitle: 'Slim Fit',
        price: '130',
      },
      size: 'L',
      color: 'azul',
      collection: 'pantalones',
      special: null,
      category: 'mujer',
      availability: 'disponible',
      rating: '3',
    },
    {
      id: 'B-4',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213966/Rectangle_18_1_iacr4a.png',
      alt: 'Nuevo artículo destacado',
      description: {
        title: 'Denim Jacket',
        subtitle: 'Casual Blue Denim',
        price: '250',
      },
      size: 'M',
      color: 'azul',
      collection: 'chaquetas',
      special: 'descuento',
      category: 'hombre',
      availability: 'disponible',
      rating: '4',
    },
    {
      id: 'B-5',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757911745/Rectangle_3_6_i9w06h.png',
      alt: 'Edición limitada en tendencia',
      description: {
        title: 'Leather Pants',
        subtitle: 'Premium Quality',
        price: '320',
      },
      size: 'S',
      color: 'negro',
      collection: 'pantalones',
      special: 'edicion_limitada',
      category: 'mujer',
      availability: 'disponible',
      rating: '5',
    },
    {
      id: 'B-6',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757732159/Rectangle_3_2_z3eslv.png',
      alt: 'Próximamente en catálogo',
      description: {
        title: 'Oversized Hoodie',
        subtitle: 'Streetwear Style',
        price: '140',
      },
      size: 'XL',
      color: 'naranja',
      collection: 'buzos',
      special: 'proximamente',
      category: 'hombre',
      availability: 'no_disponible',
      rating: '3',
    },
    {
      id: 'B-7',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757210225/product4_eqnwzt.png',
      alt: 'Producto con descuento',
      description: {
        title: 'Classic Polo',
        subtitle: 'Soft Cotton',
        price: '80',
      },
      size: 'L',
      color: 'blanco',
      collection: 'polos',
      special: 'descuento',
      category: 'mujer',
      availability: 'disponible',
      rating: '4',
    },
    {
      id: 'B-8',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757732159/Rectangle_3_1_mrgtvg.png',
      alt: 'Edición limitada',
      description: {
        title: 'Casual T-Shirt',
        subtitle: 'Graphic Print',
        price: '115',
      },
      size: 'XS',
      color: 'rojo',
      collection: 'camisas',
      special: 'edicion_limitada',
      category: 'hombre',
      availability: 'disponible',
      rating: '2',
    },
    {
      id: 'B-9',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213966/Rectangle_18_1_iacr4a.png',
      alt: 'Disponible pronto',
      description: {
        title: 'Basic Crewneck',
        subtitle: 'Comfort Fit',
        price: '95',
      },
      size: '2X',
      color: 'azul',
      collection: 'buzos',
      special: 'proximamente',
      category: 'mujer',
      availability: 'no_disponible',
      rating: '5',
    },
    {
      id: 'C-1',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213063/product6_nfsobm.png',
      alt: 'Producto destacado',
      description: {
        title: 'Slim Pants',
        subtitle: 'Casual Line',
        price: '175',
      },
      size: 'M',
      color: 'negro',
      collection: 'pantalones',
      special: null,
      category: 'hombre',
      availability: 'disponible',
      rating: '3',
    },
    {
      id: 'C-2',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757732159/Rectangle_3_2_z3eslv.png',
      alt: 'Edición especial limitada',
      description: {
        title: 'Sport Hoodie',
        subtitle: 'Active Wear',
        price: '200',
      },
      size: 'XL',
      color: 'naranja',
      collection: 'buzos',
      special: 'edicion_limitada',
      category: 'mujer',
      availability: 'disponible',
      rating: '4',
    },
    {
      id: 'C-3',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757210225/product4_eqnwzt.png',
      alt: 'Descuento especial',
      description: {
        title: 'Casual Jacket',
        subtitle: 'Zippered Design',
        price: '180',
      },
      size: 'S',
      color: 'rojo',
      collection: 'chaquetas',
      special: 'descuento',
      category: 'hombre',
      availability: 'disponible',
      rating: '5',
    },
    {
      id: 'C-4',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757732159/Rectangle_3_1_mrgtvg.png',
      alt: 'Producto próximo lanzamiento',
      description: {
        title: 'Casual Shirt',
        subtitle: 'Lightweight Fabric',
        price: '125',
      },
      size: 'L',
      color: 'blanco',
      collection: 'camisas',
      special: 'proximamente',
      category: 'mujer',
      availability: 'no_disponible',
      rating: '2',
    },
    {
      id: 'C-5',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213966/Rectangle_18_1_iacr4a.png',
      alt: 'Camisa próxima edición',
      description: {
        title: 'Oxford Shirt',
        subtitle: 'Classic Button Down',
        price: '135',
      },
      size: 'M',
      color: 'azul',
      collection: 'camisas',
      special: 'proximamente',
      category: 'hombre',
      availability: 'no_disponible',
      rating: '3',
    },
    {
      id: 'C-6',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757732159/Rectangle_3_2_z3eslv.png',
      alt: 'Producto con descuento',
      description: {
        title: 'Basic Hoodie',
        subtitle: 'Urban Style',
        price: '160',
      },
      size: 'L',
      color: 'negro',
      collection: 'buzos',
      special: 'descuento',
      category: 'mujer',
      availability: 'disponible',
      rating: '5',
    },
    {
      id: 'C-7',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757210225/product4_eqnwzt.png',
      alt: 'Edición limitada exclusiva',
      description: {
        title: 'Slim Fit Polo',
        subtitle: 'Premium Cotton',
        price: '150',
      },
      size: 'S',
      color: 'blanco',
      collection: 'polos',
      special: 'edicion_limitada',
      category: 'hombre',
      availability: 'disponible',
      rating: '4',
    },
    {
      id: 'C-8',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213063/product6_nfsobm.png',
      alt: 'Nuevo lanzamiento',
      description: {
        title: 'Chino Pants',
        subtitle: 'Slim Casual',
        price: '140',
      },
      size: 'XL',
      color: 'naranja',
      collection: 'pantalones',
      special: null,
      category: 'mujer',
      availability: 'disponible',
      rating: '2',
    },
    {
      id: 'C-9',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757732159/Rectangle_3_1_mrgtvg.png',
      alt: 'Próximamente disponible',
      description: {
        title: 'Casual Jacket',
        subtitle: 'Lightweight Windbreaker',
        price: '210',
      },
      size: 'M',
      color: 'rojo',
      collection: 'chaquetas',
      special: 'proximamente',
      category: 'hombre',
      availability: 'no_disponible',
      rating: '5',
    },
    {
      id: 'C-10',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213966/Rectangle_18_1_iacr4a.png',
      alt: 'Oferta limitada',
      description: {
        title: 'V-Neck T-Shirt',
        subtitle: 'Casual Cotton',
        price: '85',
      },
      size: '2X',
      color: 'azul',
      collection: 'camisas',
      special: 'descuento',
      category: 'mujer',
      availability: 'disponible',
      rating: '3',
    },
    {
      id: 'D-1',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757210225/product4_eqnwzt.png',
      alt: 'Edición de colección',
      description: {
        title: 'Classic Polo',
        subtitle: 'Sport Line',
        price: '95',
      },
      size: 'XS',
      color: 'blanco',
      collection: 'polos',
      special: 'edicion_limitada',
      category: 'hombre',
      availability: 'disponible',
      rating: '4',
    },
    {
      id: 'D-2',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757911745/Rectangle_3_6_i9w06h.png',
      alt: 'Producto nuevo',
      description: {
        title: 'Cargo Pants',
        subtitle: 'Utility Fit',
        price: '180',
      },
      size: 'L',
      color: 'negro',
      collection: 'pantalones',
      special: null,
      category: 'mujer',
      availability: 'disponible',
      rating: '5',
    },
    {
      id: 'D-3',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757732159/Rectangle_3_2_z3eslv.png',
      alt: 'Descuento especial',
      description: {
        title: 'Sport Hoodie',
        subtitle: 'Active Line',
        price: '170',
      },
      size: 'M',
      color: 'naranja',
      collection: 'buzos',
      special: 'descuento',
      category: 'hombre',
      availability: 'disponible',
      rating: '2',
    },
    {
      id: 'D-4',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757732159/Rectangle_3_1_mrgtvg.png',
      alt: 'Próximo lanzamiento',
      description: {
        title: 'Casual Shirt',
        subtitle: 'Linen Fabric',
        price: '190',
      },
      size: 'XL',
      color: 'rojo',
      collection: 'camisas',
      special: 'proximamente',
      category: 'mujer',
      availability: 'no_disponible',
      rating: '5',
    },
  ];

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

  #applyFilters(activeFilters: ActiveFilters | undefined): Product[] {
    if (!activeFilters || Object.keys(activeFilters).length === 0) {
      return this.#products;
    }

    return this.#products.filter((product) => {
      return Object.entries(activeFilters).every(([key, values]) => {
        if (!values.length) return true;
        switch (key) {
          case 'especial':
            return values.includes(product.special ?? '');
          case 'categoria':
            return values.includes(product.category ?? '');
          case 'color':
            return values.includes(product.color ?? '');
          case 'coleccion':
            return values.includes(product.collection ?? '');
          case 'talla':
            return values.includes(product.size ?? '');
          case 'disponibilidad':
            return values.includes(product.availability ?? '');
          case 'calificacion':
            return values.includes(product.rating ?? '');
          default:
            return true;
        }
      });
    });
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
