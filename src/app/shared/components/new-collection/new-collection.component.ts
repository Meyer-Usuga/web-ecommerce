import { Component, ViewChild } from '@angular/core';
import { BoxButtonSize, BoxButtonType } from '@interface/enums';
import { Product } from '@interface/interfaces';
import { BoxButtonComponent } from '@shared/box-button';
import { CarouselComponent } from '@shared/carousel';
import { ProductComponent } from '@shared/product';

@Component({
  selector: 'app-new-collection',
  imports: [BoxButtonComponent, CarouselComponent],
  templateUrl: './new-collection.component.html',
  styleUrl: './new-collection.component.scss',
})
export class NewCollectionComponent {
  @ViewChild('carouselInstance') carouselInstance?: CarouselComponent;

  readonly newCollection: Product[] = [
    {
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1756780846/product2_ydoqcc.png',
      alt: 'Nuevo producto de colección',
    },
    {
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1756779610/product1_zgq3nh.png',
      alt: 'Nuevo producto de colección',
    },
  ];

  readonly typeControl = BoxButtonType;
  readonly sizeControl = BoxButtonSize;

  prevItems() {
    this.carouselInstance?.prev();
  }

  nextItems() {
    this.carouselInstance?.next();
  }
}
