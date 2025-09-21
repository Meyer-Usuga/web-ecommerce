import { Component, input, output } from '@angular/core';
import { BoxButtonSize, BoxButtonType } from '@interface/enums';
import { FilterValue } from '@interface/interfaces';
import { BoxButtonComponent } from '@shared/box-button';

@Component({
  selector: 'app-sample-product-size',
  imports: [BoxButtonComponent],
  standalone: true,
  templateUrl: './sample-product-size.component.html',
  styleUrl: './sample-product-size.component.scss',
})
export class SampleProductSizeComponent {
  readonly activeSize = input<string>();
  readonly onChangeSize = output<FilterValue>();
  readonly sizes = input.required<string[] | undefined>();
  readonly typeControl = BoxButtonType;
  readonly sizeControl = BoxButtonSize;

  onChangeFilter(key: string, value: string) {
    const filter: FilterValue = {
      label: key,
      value: value,
    };
    this.onChangeSize.emit(filter);
  }
}
