import { CurrencyPipe, NgStyle } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';
import { Product } from '@interface/interfaces';

@Component({
  selector: 'app-product',
  imports: [NgStyle, CurrencyPipe],
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  readonly product = input.required<Product>();
  readonly showAddButton = input<boolean>(false);
  readonly showDetails = input<boolean>(true);
  readonly showColorDots = input<boolean>(false);
  readonly productColorDots = computed(() => {
    return this.#mapColor();
  });
  readonly productId = computed(() => {
    return `'${this.product().id}__product'`;
  });
  readonly onClick = output<void>();

  #mapColor() {
    const colors: Record<string, string> = {
      azul: 'blue',
      rojo: 'red',
      negro: 'black',
      naranja: 'orange',
      blanco: 'white',
      verde: 'green',
    };

    const mapColors: string[] = [];
    const productColors = this.product().color;

    productColors?.forEach((sampleColor) => {
      mapColors.push(colors[sampleColor.color]);
    });

    return mapColors;
  }

  onClickProduct() {
    this.onClick.emit();
  }
}
