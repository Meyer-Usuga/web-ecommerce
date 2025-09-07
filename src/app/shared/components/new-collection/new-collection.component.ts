import { Component } from '@angular/core';
import { BoxButtonType } from '@interface/enums';
import { Product } from '@interface/interfaces';
import { BoxButtonComponent } from '@shared/box-button';
import { ProductComponent } from '@shared/product';

@Component({
  selector: 'app-new-collection',
  imports: [ProductComponent, BoxButtonComponent],
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

  readonly typeControl = BoxButtonType;
}
