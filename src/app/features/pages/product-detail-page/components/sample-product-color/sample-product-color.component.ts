import { NgStyle } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { FilterValue, ImageColor } from '@interface/interfaces';

@Component({
  selector: 'app-sample-product-color',
  imports: [NgStyle],
  standalone: true,
  templateUrl: './sample-product-color.component.html',
  styleUrl: './sample-product-color.component.scss',
})
export class SampleProductColorComponent {
  readonly activeColor = input<string>();
  readonly onChangeColor = output<FilterValue>();
  readonly colors = input.required<ImageColor[] | undefined>();
  readonly sampleColors = computed(() => {
    return this.#mapColor();
  });

  #mapColor() {
    const colors: Record<string, string> = {
      azul: 'blue',
      rojo: 'red',
      negro: 'black',
      naranja: 'orange',
      blanco: 'white',
      verde: 'green',
    };

    const productColors = this.colors();

    return (
      productColors?.map((sampleColor) => {
        const mappedColor = colors[sampleColor.color];
        return {
          name: mappedColor,
          originalName: sampleColor.color,
          isActive: sampleColor.color === this.activeColor(),
        };
      }) || []
    );
  }

  onChangeFilter(key: string, value: string) {
    const filter: FilterValue = {
      label: key,
      value: value,
    };
    this.onChangeColor.emit(filter);
  }
}
