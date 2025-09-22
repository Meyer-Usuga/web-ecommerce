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

  readonly query = computed(
    () => this.#activeFilters()?.['busqueda']?.[0] ?? ''
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
      { label: 'Verde', value: 'verde' },
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
        value: '90000-120000',
      },
      {
        label: '120.000 - 150.000',
        value: '120000-150000',
      },
      {
        label: '150.000 - 180.000',
        value: '150000-180000',
      },
      {
        label: '180.000 - 210.000',
        value: '180000-210000',
      },
      { label: '> 210.000', value: '210000' },
    ],
    ratings: [
      { label: '1 estrella', value: '1' },
      { label: '2 estrellas', value: '2' },
      { label: '3 estrellas', value: '3' },
      { label: '4 estrellas', value: '4' },
      { label: '5 estrellas', value: '5' },
    ],
  };

  readonly #singleValueParams = ['especial', 'busqueda'];

  readonly #products: Product[] = [
    {
      id: 'A-1',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757987700/Gemini_Generated_Image_l7xliul7xliul7xl_ynkuyb.png',
      alt: 'Nuevo articulo de la semana',
      description: {
        title: 'V-Neck T-Shirt',
        subtitle: 'Embroidered Seersucker Shirt',
        price: '99000',
      },
      size: ['XS', 'S', 'M', 'L', 'XL', '2X'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757987700/Gemini_Generated_Image_l7xliul7xliul7xl_ynkuyb.png',
          color: 'naranja',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757987700/Gemini_Generated_Image_l7xliul7xliul7xl_ynkuyb.png',
          color: 'blanco',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757987700/Gemini_Generated_Image_l7xliul7xliul7xl_ynkuyb.png',
          color: 'azul',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757987700/Gemini_Generated_Image_l7xliul7xliul7xl_ynkuyb.png',
          color: 'negro',
        },
      ],
      collection: 'camisas',
      special: null,
      category: 'hombre',
      availability: 'disponible',
      rating: '4',
    },
    {
      id: 'A-2',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758506024/Gemini_Generated_Image_qkedqzqkedqzqked_wbxbdy.png',
      alt: 'Nuevo articulo de la semana',
      description: {
        title: 'Cotton T Shirt',
        subtitle: 'Basic Slim Fit T-Shirt',
        price: '120000',
      },
      size: ['XS', 'S', 'M', 'L', 'XL', '2X'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758506024/Gemini_Generated_Image_qkedqzqkedqzqked_wbxbdy.png',
          color: 'naranja',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758506024/Gemini_Generated_Image_qkedqzqkedqzqked_wbxbdy.png',
          color: 'blanco',
        },
      ],
      collection: 'buzos',
      special: 'descuento',
      category: 'mujer',
      availability: 'disponible',
      rating: '5',
    },
    {
      id: 'A-3',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758163342/Gemini_Generated_Image_iilu3xiilu3xiilu_bfgnrv.png',
      alt: 'Nuevo articulo de la semana',
      description: {
        title: 'Henley T-Shirt',
        subtitle: 'Blurred Print T-Shirt',
        price: '180000',
      },
      size: ['XS', 'S', '2X'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758163342/Gemini_Generated_Image_iilu3xiilu3xiilu_bfgnrv.png',
          color: 'azul',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758163342/Gemini_Generated_Image_iilu3xiilu3xiilu_bfgnrv.png',
          color: 'naranja',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758163342/Gemini_Generated_Image_iilu3xiilu3xiilu_bfgnrv.png',
          color: 'negro',
        },
      ],
      collection: 'polos',
      special: 'edicion_limitada',
      category: 'hombre',
      availability: 'no_disponible',
      rating: '3',
    },
    {
      id: 'A-4',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758163496/Gemini_Generated_Image_db6ea5db6ea5db6e_kjfx7n.png',
      alt: 'Nuevo articulo de la semana',
      description: {
        title: 'Crewneck T-Shirt',
        subtitle: 'Full Sleeve Zipper',
        price: '210000',
      },
      size: ['XS', '2X'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758163496/Gemini_Generated_Image_db6ea5db6ea5db6e_kjfx7n.png',
          color: 'blanco',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758163496/Gemini_Generated_Image_db6ea5db6ea5db6e_kjfx7n.png',
          color: 'naranja',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758163496/Gemini_Generated_Image_db6ea5db6ea5db6e_kjfx7n.png',
          color: 'rojo',
        },
      ],
      collection: 'chaquetas',
      special: 'proximamente',
      category: 'mujer',
      availability: 'disponible',
      rating: '5',
    },
    {
      id: 'B-1',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758506021/Gemini_Generated_Image_7f0xbr7f0xbr7f0x_fozsea.png',
      alt: 'Producto especial',
      description: {
        title: 'Basic Hoodie',
        subtitle: 'Casual Wear',
        price: '110000',
      },
      size: ['S', 'M'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758506021/Gemini_Generated_Image_7f0xbr7f0xbr7f0x_fozsea.png',
          color: 'naranja',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758506021/Gemini_Generated_Image_7f0xbr7f0xbr7f0x_fozsea.png',
          color: 'rojo',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758506021/Gemini_Generated_Image_7f0xbr7f0xbr7f0x_fozsea.png',
          color: 'blanco',
        },
      ],
      collection: 'buzos',
      special: 'descuento',
      category: 'mujer',
      availability: 'disponible',
      rating: '5',
    },
    {
      id: 'B-2',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758163820/Gemini_Generated_Image_lbeefxlbeefxlbee_aaei56.png',
      alt: 'Producto especial',
      description: {
        title: 'Slim Fit Polo',
        subtitle: 'Casual Line',
        price: '90000',
      },
      size: ['XS', 'S'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758163820/Gemini_Generated_Image_lbeefxlbeefxlbee_aaei56.png',
          color: 'rojo',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758163820/Gemini_Generated_Image_lbeefxlbeefxlbee_aaei56.png',
          color: 'azul',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758163820/Gemini_Generated_Image_lbeefxlbeefxlbee_aaei56.png',
          color: 'negro',
        },
      ],
      collection: 'polos',
      special: 'edicion_limitada',
      category: 'hombre',
      availability: 'no_disponible',
      rating: '4',
    },
    {
      id: 'B-3',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1756779610/product1_zgq3nh.png',
      alt: 'Producto especial',
      description: {
        title: 'Classic Pants',
        subtitle: 'Slim Fit',
        price: '130000',
      },
      size: ['XS', 'XL', '2X'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1756779610/product1_zgq3nh.png',
          color: 'azul',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1756779610/product1_zgq3nh.png',
          color: 'blanco',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1756779610/product1_zgq3nh.png',
          color: 'naranja',
        },
      ],
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
        price: '250000',
      },
      size: ['XS', 'S', 'M', 'L'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213966/Rectangle_18_1_iacr4a.png',
          color: 'azul',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213966/Rectangle_18_1_iacr4a.png',
          color: 'negro',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213966/Rectangle_18_1_iacr4a.png',
          color: 'rojo',
        },
      ],
      collection: 'chaquetas',
      special: 'descuento',
      category: 'nuevo',
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
        price: '320000',
      },
      size: ['XS', 'S', 'M'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757911745/Rectangle_3_6_i9w06h.png',
          color: 'negro',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757911745/Rectangle_3_6_i9w06h.png',
          color: 'blanco',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757911745/Rectangle_3_6_i9w06h.png',
          color: 'azul',
        },
      ],
      collection: 'pantalones',
      special: 'edicion_limitada',
      category: 'mujer',
      availability: 'disponible',
      rating: '5',
    },
    {
      id: 'B-6',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757988984/Gemini_Generated_Image_ljsvp0ljsvp0ljsv_aetb0l.png',
      alt: 'Próximamente en catálogo',
      description: {
        title: 'Oversized Hoodie',
        subtitle: 'Streetwear Style',
        price: '140000',
      },
      size: ['XS', 'S', 'M', 'L', 'XL', '2X'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757988984/Gemini_Generated_Image_ljsvp0ljsvp0ljsv_aetb0l.png',
          color: 'naranja',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757988984/Gemini_Generated_Image_ljsvp0ljsvp0ljsv_aetb0l.png',
          color: 'rojo',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757988984/Gemini_Generated_Image_ljsvp0ljsvp0ljsv_aetb0l.png',
          color: 'verde',
        },
      ],
      collection: 'buzos',
      special: 'proximamente',
      category: 'hombre',
      availability: 'no_disponible',
      rating: '3',
    },
    {
      id: 'B-7',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757989765/Gemini_Generated_Image_4tubhe4tubhe4tub_b6gpig.png',
      alt: 'Producto con descuento',
      description: {
        title: 'Classic Polo',
        subtitle: 'Soft Cotton',
        price: '80000',
      },
      size: ['XS', 'S', 'M', 'L', 'XL', '2X'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757989765/Gemini_Generated_Image_4tubhe4tubhe4tub_b6gpig.png',
          color: 'blanco',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757989765/Gemini_Generated_Image_4tubhe4tubhe4tub_b6gpig.png',
          color: 'azul',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757989765/Gemini_Generated_Image_4tubhe4tubhe4tub_b6gpig.png',
          color: 'negro',
        },
      ],
      collection: 'polos',
      special: 'descuento',
      category: 'mujer',
      availability: 'disponible',
      rating: '4',
    },
    {
      id: 'B-8',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757987643/Gemini_Generated_Image_o6qlh4o6qlh4o6ql_oih0fr.png',
      alt: 'Edición limitada',
      description: {
        title: 'Casual T-Shirt',
        subtitle: 'Graphic Print',
        price: '115000',
      },
      size: ['XS', 'S', 'M', 'L', '2X'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757987643/Gemini_Generated_Image_o6qlh4o6qlh4o6ql_oih0fr.png',
          color: 'rojo',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757987643/Gemini_Generated_Image_o6qlh4o6qlh4o6ql_oih0fr.png',
          color: 'naranja',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757987643/Gemini_Generated_Image_o6qlh4o6qlh4o6ql_oih0fr.png',
          color: 'blanco',
        },
      ],
      collection: 'camisas',
      special: 'edicion_limitada',
      category: 'hombre',
      availability: 'disponible',
      rating: '2',
    },
    {
      id: 'B-9',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757990629/Gemini_Generated_Image_xxpapxxxpapxxxpa_c7ntwg.png',
      alt: 'Disponible pronto',
      description: {
        title: 'Basic Crewneck',
        subtitle: 'Comfort Fit',
        price: '95000',
      },
      size: ['XS', 'S'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757990629/Gemini_Generated_Image_xxpapxxxpapxxxpa_c7ntwg.png',
          color: 'azul',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757990629/Gemini_Generated_Image_xxpapxxxpapxxxpa_c7ntwg.png',
          color: 'negro',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757990629/Gemini_Generated_Image_xxpapxxxpapxxxpa_c7ntwg.png',
          color: 'rojo',
        },
      ],
      collection: 'buzos',
      special: 'proximamente',
      category: 'mujer',
      availability: 'no_disponible',
      rating: '5',
    },
    {
      id: 'B-10',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758163681/Gemini_Generated_Image_lrdwjelrdwjelrdw_ff3flv.png',
      alt: 'Nuevo articulo de la semana',
      description: {
        title: 'Crewneck T-Shirt',
        subtitle: 'Full Sleeve Zipper',
        price: '150000',
      },
      size: ['L'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758163681/Gemini_Generated_Image_lrdwjelrdwjelrdw_ff3flv.png',
          color: 'rojo',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758163681/Gemini_Generated_Image_lrdwjelrdwjelrdw_ff3flv.png',
          color: 'azul',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758163681/Gemini_Generated_Image_lrdwjelrdwjelrdw_ff3flv.png',
          color: 'negro',
        },
      ],
      collection: 'pantalones',
      special: null,
      category: 'hombre',
      availability: 'disponible',
      rating: '2',
    },
    {
      id: 'C-1',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758164592/Gemini_Generated_Image_he75tvhe75tvhe75_zsgmm1.png',
      alt: 'Producto destacado',
      description: {
        title: 'Slim Pants',
        subtitle: 'Casual Line',
        price: '175000',
      },
      size: ['S', 'M', 'L', 'XL', '2X'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758164592/Gemini_Generated_Image_he75tvhe75tvhe75_zsgmm1.png',
          color: 'negro',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758164592/Gemini_Generated_Image_he75tvhe75tvhe75_zsgmm1.png',
          color: 'azul',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758164592/Gemini_Generated_Image_he75tvhe75tvhe75_zsgmm1.png',
          color: 'blanco',
        },
      ],
      collection: 'pantalones',
      special: null,
      category: 'hombre',
      availability: 'disponible',
      rating: '3',
    },
    {
      id: 'C-2',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758506024/Gemini_Generated_Image_bhtninbhtninbhtn_zwidqm.png',
      alt: 'Edición especial limitada',
      description: {
        title: 'Sport Hoodie',
        subtitle: 'Active Wear',
        price: '200000',
      },
      size: ['XS', 'S', 'M', 'L', 'XL'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758506024/Gemini_Generated_Image_bhtninbhtninbhtn_zwidqm.png',
          color: 'naranja',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758506024/Gemini_Generated_Image_bhtninbhtninbhtn_zwidqm.png',
          color: 'rojo',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758506024/Gemini_Generated_Image_bhtninbhtninbhtn_zwidqm.png',
          color: 'negro',
        },
      ],
      collection: 'buzos',
      special: 'edicion_limitada',
      category: 'mujer',
      availability: 'disponible',
      rating: '4',
    },
    {
      id: 'C-3',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758164958/Gemini_Generated_Image_i5oyodi5oyodi5oy_p7vldp.png',
      alt: 'Descuento especial',
      description: {
        title: 'Casual Jacket',
        subtitle: 'Zippered Design',
        price: '180000',
      },
      size: ['XS', 'S', 'M', 'L', 'XL', '2X'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758164958/Gemini_Generated_Image_i5oyodi5oyodi5oy_p7vldp.png',
          color: 'rojo',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758164958/Gemini_Generated_Image_i5oyodi5oyodi5oy_p7vldp.png',
          color: 'blanco',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758164958/Gemini_Generated_Image_i5oyodi5oyodi5oy_p7vldp.png',
          color: 'azul',
        },
      ],
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
        price: '125000',
      },
      size: ['XS', 'S', 'M', 'L', 'XL', '2X'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757732159/Rectangle_3_1_mrgtvg.png',
          color: 'blanco',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757732159/Rectangle_3_1_mrgtvg.png',
          color: 'naranja',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757732159/Rectangle_3_1_mrgtvg.png',
          color: 'rojo',
        },
      ],
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
        price: '135000',
      },
      size: ['XS', 'S', 'M'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213966/Rectangle_18_1_iacr4a.png',
          color: 'verde',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213966/Rectangle_18_1_iacr4a.png',
          color: 'negro',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213966/Rectangle_18_1_iacr4a.png',
          color: 'blanco',
        },
      ],
      collection: 'camisas',
      special: 'proximamente',
      category: 'hombre',
      availability: 'no_disponible',
      rating: '3',
    },
    {
      id: 'C-6',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758506447/Gemini_Generated_Image_may7wamay7wamay7_pmc33x.png',
      alt: 'Producto con descuento',
      description: {
        title: 'Basic Hoodie',
        subtitle: 'Urban Style',
        price: '160000',
      },
      size: ['2X'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758506447/Gemini_Generated_Image_may7wamay7wamay7_pmc33x.png',
          color: 'negro',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758506447/Gemini_Generated_Image_may7wamay7wamay7_pmc33x.png',
          color: 'rojo',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758506447/Gemini_Generated_Image_may7wamay7wamay7_pmc33x.png',
          color: 'azul',
        },
      ],
      collection: 'buzos',
      special: 'descuento',
      category: 'mujer',
      availability: 'disponible',
      rating: '5',
    },
    {
      id: 'C-7',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758164027/Gemini_Generated_Image_mut29kmut29kmut2_iae20l.png',
      alt: 'Edición limitada exclusiva',
      description: {
        title: 'Slim Fit Polo',
        subtitle: 'Premium Cotton',
        price: '150000',
      },
      size: ['XS', 'S', 'M', 'L', 'XL', '2X'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758164027/Gemini_Generated_Image_mut29kmut29kmut2_iae20l.png',
          color: 'blanco',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758164027/Gemini_Generated_Image_mut29kmut29kmut2_iae20l.png',
          color: 'naranja',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758164027/Gemini_Generated_Image_mut29kmut29kmut2_iae20l.png',
          color: 'rojo',
        },
      ],
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
        price: '140000',
      },
      size: ['XS', 'S', 'M', 'L', 'XL', '2X'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213063/product6_nfsobm.png',
          color: 'naranja',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213063/product6_nfsobm.png',
          color: 'blanco',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213063/product6_nfsobm.png',
          color: 'negro',
        },
      ],
      collection: 'pantalones',
      special: null,
      category: 'mujer',
      availability: 'disponible',
      rating: '2',
    },
    {
      id: 'C-9',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758164220/Gemini_Generated_Image_gbz9yqgbz9yqgbz9_f0fcvk.png',
      alt: 'Próximamente disponible',
      description: {
        title: 'Casual Jacket',
        subtitle: 'Lightweight Windbreaker',
        price: '210000',
      },
      size: ['M', 'L', 'XL', '2X'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758164220/Gemini_Generated_Image_gbz9yqgbz9yqgbz9_f0fcvk.png',
          color: 'rojo',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758164220/Gemini_Generated_Image_gbz9yqgbz9yqgbz9_f0fcvk.png',
          color: 'azul',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758164220/Gemini_Generated_Image_gbz9yqgbz9yqgbz9_f0fcvk.png',
          color: 'blanco',
        },
      ],
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
        price: '85000',
      },
      size: ['XS', 'S'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213966/Rectangle_18_1_iacr4a.png',
          color: 'azul',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213966/Rectangle_18_1_iacr4a.png',
          color: 'negro',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213966/Rectangle_18_1_iacr4a.png',
          color: 'rojo',
        },
      ],
      collection: 'camisas',
      special: 'descuento',
      category: 'mujer',
      availability: 'disponible',
      rating: '3',
    },
    {
      id: 'D-1',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758164394/Gemini_Generated_Image_be8r57be8r57be8r_fcr3s9.png',
      alt: 'Edición de colección',
      description: {
        title: 'Classic Polo',
        subtitle: 'Sport Line',
        price: '95000',
      },
      size: ['XS', 'S', 'M', 'L', 'XL', '2X'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758164394/Gemini_Generated_Image_be8r57be8r57be8r_fcr3s9.png',
          color: 'blanco',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758164394/Gemini_Generated_Image_be8r57be8r57be8r_fcr3s9.png',
          color: 'naranja',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1758164394/Gemini_Generated_Image_be8r57be8r57be8r_fcr3s9.png',
          color: 'azul',
        },
      ],
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
        price: '180000',
      },
      size: ['XS', 'S', 'M', 'L', 'XL', '2X'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757911745/Rectangle_3_6_i9w06h.png',
          color: 'negro',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757911745/Rectangle_3_6_i9w06h.png',
          color: 'rojo',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757911745/Rectangle_3_6_i9w06h.png',
          color: 'blanco',
        },
      ],
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
        price: '170000',
      },
      size: ['XS', '2X'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757732159/Rectangle_3_2_z3eslv.png',
          color: 'naranja',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757732159/Rectangle_3_2_z3eslv.png',
          color: 'azul',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757732159/Rectangle_3_2_z3eslv.png',
          color: 'negro',
        },
      ],
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
        price: '190000',
      },
      size: ['XS', 'S', 'M', 'L', 'XL', '2X'],
      color: [
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757732159/Rectangle_3_1_mrgtvg.png',
          color: 'rojo',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757732159/Rectangle_3_1_mrgtvg.png',
          color: 'blanco',
        },
        {
          imageUrl:
            'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757732159/Rectangle_3_1_mrgtvg.png',
          color: 'azul',
        },
      ],
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

    const currentCategory = this.#router.url.split('/')[2];
    const withParams = currentCategory?.includes('?');
    result['categoria'] = withParams
      ? [currentCategory.split('?')[0]]
      : [currentCategory];

    return result;
  }

  #filterByText(product: Product, value: string[]): boolean {
    const query = value.join(' ').toLowerCase().trim();

    if (!query) {
      return true;
    }

    const words = query.split(/\s+/);

    const searchable = [
      product.description?.title,
      product.description?.subtitle,
      product.category,
      product.collection,
      product.color?.map((c) => c.color).join(' '),
      product.special,
      product.size?.join(' '),
      product.availability,
      product.rating,
      product.description?.price?.toString(),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();

    return words.every((token) => searchable.includes(token));
  }

  #filterByPrice(product: Product, value: string[]): boolean {
    if (!product.description?.price) return false;

    const productPrice = Number(product.description.price);

    return value.some((range) => {
      if (range.includes('-')) {
        const [min, max] = range.split('-').map(Number);
        return productPrice >= min && productPrice <= max;
      } else {
        const min = Number(range);
        return productPrice > min;
      }
    });
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
            return product.color?.some((c) => values.includes(c.color));
          case 'coleccion':
            return values.includes(product.collection ?? '');
          case 'talla':
            return product.size?.some((s) => values.includes(s));
          case 'disponibilidad':
            return values.includes(product.availability ?? '');
          case 'calificacion':
            return values.includes(product.rating ?? '');
          case 'busqueda':
            return this.#filterByText(product, values);
          case 'precio':
            return this.#filterByPrice(product, values);
          default:
            return true;
        }
      });
    });
  }

  updateQueryParams(filter: FilterValue, activeSingleValue?: boolean) {
    const { label, value } = filter;

    const isSingleValue =
      this.#singleValueParams.includes(label) || activeSingleValue;

    const current = this.#activatedRoute.snapshot.queryParamMap.getAll(label);

    let updated: string[] | null;

    if (isSingleValue) {
      if (current.includes(value) || value === '') {
        updated = null;
      } else {
        updated = [value];
      }
    } else {
      updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
    }

    this.#router.navigate([], {
      queryParams: { [label]: updated },
      queryParamsHandling: 'merge',
    });
  }

  getActiveFiltersFromQueryParams(productId: string | undefined) {
    const activeFilters = this.#activeFilters();
    const querySizes = activeFilters!['talla'];
    const queryColors = activeFilters!['color'];

    const product = this.getProductById(productId);

    if (!product) return [];

    const firstSize = !querySizes ? product.size?.[0] : querySizes[0];
    const firstColor = !queryColors ? product.color?.[0].color : queryColors[0];

    if (!firstSize || !firstColor) return [];

    const sizeFilter = {
      label: 'talla',
      value: firstSize,
    };

    const colorFilter = {
      label: 'color',
      value: firstColor,
    };

    return [sizeFilter, colorFilter];
  }

  checkActiveFilter(filter: FilterValue) {
    const { label, value } = filter;
    const typeFilter = this.activeFilters[label];

    if (typeFilter?.includes(value)) {
      return true;
    }

    return false;
  }

  getProductById(productId: string | undefined): Product | undefined {
    const products = this.#products;
    return products.find((product) => product.id === productId);
  }
}
