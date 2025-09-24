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
        id: 'F-3',
        imageUrl:
          'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213966/Rectangle_18_1_iacr4a.png',
        alt: 'Nuevo producto de colección',
        description: {
          title: 'V-Neck T-Shirt',
          subtitle: 'Embroidered Seersucker Shirt',
          price: '99000',
        },
      },
    },
    {
      type: 'men',
      amount: 12,
      featured: {
        id: 'F-4',
        imageUrl:
          'https://res.cloudinary.com/db1tp6eqg/image/upload/v1756780846/product2_ydoqcc.png',
        alt: 'Nuevo producto de colección',
        description: {
          title: 'V-Neck T-Shirt',
          subtitle: 'Embroidered Seersucker Shirt',
          price: '99000',
        },
      },
    },
    {
      type: 'men',
      amount: 12,
      featured: {
        id: 'F-5',
        imageUrl:
          'https://res.cloudinary.com/db1tp6eqg/image/upload/v1757213965/Rectangle_15_i2hd95.png',
        alt: 'Nuevo producto de colección',
        description: {
          title: 'V-Neck T-Shirt',
          subtitle: 'Embroidered Seersucker Shirt',
          price: '99000',
        },
      },
    },
  ];
}
