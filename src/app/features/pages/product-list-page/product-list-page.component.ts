import { Component } from '@angular/core';
import { NavbarComponent } from '@shared/navbar';
import { SidebarFiltersComponent } from './components';
import { FooterComponent } from '@shared/footer';
import { SearchInputComponent } from '@shared/search-input';
import { BreadcrumbComponent } from '@shared/breadcrumb';
import { BoxButtonComponent } from '@shared/box-button';
import { BoxButtonSize, BoxButtonType } from '@interface/enums';
import { Product } from '@interface/interfaces';
import { ProductComponent } from '@shared/product';

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
  readonly typeControl = BoxButtonType;
  readonly sizeControl = BoxButtonSize;

  readonly products: Product[] = [
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
    },
    {
      id: 'A-2',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757732159/Rectangle_3_2_z3eslv.png',
      alt: 'Nuevo articulo de la semana',
      description: {
        title: 'Cotton T Shirt',
        subtitle: 'Basic Slim Fit T-Shirt',
        price: '99',
      },
    },
    {
      id: 'A-3',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757732159/Rectangle_3_1_mrgtvg.png',
      alt: 'Nuevo articulo de la semana',
      description: {
        title: 'Henley T-Shirt',
        subtitle: 'Blurred Print T-Shirt',
        price: '99',
      },
    },
    {
      id: 'A-4',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757210225/product4_eqnwzt.png',
      alt: 'Nuevo articulo de la semana',
      description: {
        title: 'Crewneck T-Shirt',
        subtitle: 'Full Sleeve Zipper',
        price: '99',
      },
    },
    {
      id: 'A-5',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213063/product6_nfsobm.png',
      alt: 'Nuevo articulo de la semana',
      description: {
        title: 'Crewneck T-Shirt',
        subtitle: 'Full Sleeve Zipper',
        price: '99',
      },
    },
    {
      id: 'A-4',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757210225/product4_eqnwzt.png',
      alt: 'Nuevo articulo de la semana',
      description: {
        title: 'Crewneck T-Shirt',
        subtitle: 'Full Sleeve Zipper',
        price: '99',
      },
    },
    {
      id: 'A-5',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213063/product6_nfsobm.png',
      alt: 'Nuevo articulo de la semana',
      description: {
        title: 'Crewneck T-Shirt',
        subtitle: 'Full Sleeve Zipper',
        price: '99',
      },
    },
    {
      id: 'A-4',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757210225/product4_eqnwzt.png',
      alt: 'Nuevo articulo de la semana',
      description: {
        title: 'Crewneck T-Shirt',
        subtitle: 'Full Sleeve Zipper',
        price: '99',
      },
    },
    {
      id: 'A-5',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213063/product6_nfsobm.png',
      alt: 'Nuevo articulo de la semana',
      description: {
        title: 'Crewneck T-Shirt',
        subtitle: 'Full Sleeve Zipper',
        price: '99',
      },
    },
    {
      id: 'A-4',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757210225/product4_eqnwzt.png',
      alt: 'Nuevo articulo de la semana',
      description: {
        title: 'Crewneck T-Shirt',
        subtitle: 'Full Sleeve Zipper',
        price: '99',
      },
    },
    {
      id: 'A-5',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213063/product6_nfsobm.png',
      alt: 'Nuevo articulo de la semana',
      description: {
        title: 'Crewneck T-Shirt',
        subtitle: 'Full Sleeve Zipper',
        price: '99',
      },
    },
    {
      id: 'A-4',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757210225/product4_eqnwzt.png',
      alt: 'Nuevo articulo de la semana',
      description: {
        title: 'Crewneck T-Shirt',
        subtitle: 'Full Sleeve Zipper',
        price: '99',
      },
    },
    {
      id: 'A-5',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213063/product6_nfsobm.png',
      alt: 'Nuevo articulo de la semana',
      description: {
        title: 'Crewneck T-Shirt',
        subtitle: 'Full Sleeve Zipper',
        price: '99',
      },
    },
  ];

  onSelectFilter() {
    //TODO: Implementar
  }
}
