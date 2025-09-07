import { Component, signal } from '@angular/core';
import { BoxButtonType } from '@interface/enums';
import { Product } from '@interface/interfaces';
import { BoxButtonComponent } from '@shared/box-button';
import { ProductComponent } from '@shared/product';

@Component({
  selector: 'app-carousel',
  imports: [ProductComponent, BoxButtonComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent {
  readonly products: Product[] = [
    {
      id: 'A-1',
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1756779610/product1_zgq3nh.png',
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
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1756779610/product1_zgq3nh.png',
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
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1756779610/product1_zgq3nh.png',
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
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1756779610/product1_zgq3nh.png',
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
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1756779610/product1_zgq3nh.png',
      alt: 'Nuevo articulo de la semana',
      description: {
        title: 'Crewneck T-Shirt',
        subtitle: 'Full Sleeve Zipper',
        price: '99',
      },
    },
  ];
  readonly typeControl = BoxButtonType;

  readonly isAtStart = signal(true);
  readonly isAtEnd = signal(false);

  prev(carousel: HTMLElement) {
    carousel.scrollBy({ left: -300, behavior: 'smooth' });
  }

  next(carousel: HTMLElement) {
    carousel.scrollBy({ left: 300, behavior: 'smooth' });
  }

  checkButtons(carousel: HTMLElement) {
    const { scrollLeft, clientWidth, scrollWidth } = carousel;

    this.isAtStart.set(scrollLeft === 0);
    this.isAtEnd.set(scrollLeft + clientWidth >= scrollWidth - 1);
  }
}
