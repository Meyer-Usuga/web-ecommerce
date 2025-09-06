import { Component } from '@angular/core';
import { Product } from '@interface/interfaces';
import { ProductComponent } from '@shared/product';

@Component({
  selector: 'app-new-collection',
  imports: [ProductComponent],
  templateUrl: './new-collection.component.html',
  styleUrl: './new-collection.component.scss',
})
export class NewCollectionComponent {
  readonly newCollection: Product[] = [
    {
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1756780846/product2_ydoqcc.png',
      alt: 'Nuevo producto de colección',
    },
    {
      imageUrl:
        'https://res.cloudinary.com/db1tp6eqg/image/upload/v1756780846/product2_ydoqcc.png',
      alt: 'Nuevo producto de colección',
    },
  ];
}
