import { NgStyle } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { Product } from '@interface/interfaces';

@Component({
  selector: 'app-product',
  imports: [NgStyle],
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  readonly product = input.required<Product>();
  readonly showAddButton = input<boolean>(false);
  readonly showDetails = input<boolean>(true);
  readonly showColorDots = input<boolean>(false);
  readonly productColorDot = computed(() => {
    return this.#mapColor();
  });
  readonly productId = computed(() => {
    return `'${this.product().id}__product'`;
  });

  #mapColor() {
    const colors: Record<string, string> = {
      azul: 'blue',
      rojo: 'red',
      negro: 'black',
      naranja: 'orange',
      blanco: 'white',
    };

    const productColor = this.product().color;

    return colors[productColor!];
  }
}
