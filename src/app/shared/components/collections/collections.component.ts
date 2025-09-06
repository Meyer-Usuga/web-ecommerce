import { Component } from '@angular/core';
import { Collection } from '@interface/interfaces';
import { ProductComponent } from '@shared/product';

@Component({
  selector: 'app-collections',
  imports: [ProductComponent],
  templateUrl: './collections.component.html',
  styleUrl: './collections.component.scss',
})
export class CollectionsComponent {
  readonly collections: Collection[] = [
    {
      type: 'men',
      amount: 12,
      featured: {
        imageUrl:
          'https://res.cloudinary.com/db1tp6eqg/image/upload/v1756779610/product1_zgq3nh.png',
        alt: 'Nuevo producto de colección',
        description: {
          title: 'V-Neck T-Shirt',
          subtitle: 'Embroidered Seersucker Shirt',
          price: '99',
        },
      },
    },
    {
      type: 'men',
      amount: 12,
      featured: {
        imageUrl:
          'https://res.cloudinary.com/db1tp6eqg/image/upload/v1756779610/product1_zgq3nh.png',
        alt: 'Nuevo producto de colección',
        description: {
          title: 'V-Neck T-Shirt',
          subtitle: 'Embroidered Seersucker Shirt',
          price: '99',
        },
      },
    },
    {
      type: 'men',
      amount: 12,
      featured: {
        imageUrl:
          'https://res.cloudinary.com/db1tp6eqg/image/upload/v1756779610/product1_zgq3nh.png',
        alt: 'Nuevo producto de colección',
        description: {
          title: 'V-Neck T-Shirt',
          subtitle: 'Embroidered Seersucker Shirt',
          price: '99',
        },
      },
    },
  ];
}
