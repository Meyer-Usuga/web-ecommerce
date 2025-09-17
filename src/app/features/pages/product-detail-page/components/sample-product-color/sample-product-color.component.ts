import { NgStyle } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-sample-product-color',
  imports: [NgStyle],
  standalone: true,
  templateUrl: './sample-product-color.component.html',
  styleUrl: './sample-product-color.component.scss',
})
export class SampleProductColorComponent {
  readonly color = input.required<string | undefined>();
  readonly mapColor = computed(() => {
    return this.#mapColor();
  });

  #mapColor() {
    const colors: Record<string, string> = {
      azul: 'blue',
      rojo: 'red',
      negro: 'black',
      naranja: 'orange',
      blanco: 'white',
    };

    const productColor = this.color();

    return colors[productColor!];
  }
}
