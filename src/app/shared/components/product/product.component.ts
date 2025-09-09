import { Component, input } from '@angular/core';
import { Product } from '@interface/interfaces';

@Component({
  selector: 'app-product',
  imports: [],
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  readonly product = input.required<Product>();
  readonly showAddButton = input<boolean>(false);
  readonly showDetails = input<boolean>(true);
}
