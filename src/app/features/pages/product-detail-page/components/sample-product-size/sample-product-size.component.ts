import { Component, input } from '@angular/core';
import { BoxButtonSize, BoxButtonType } from '@interface/enums';
import { BoxButtonComponent } from '@shared/box-button';

@Component({
  selector: 'app-sample-product-size',
  imports: [BoxButtonComponent],
  standalone: true,
  templateUrl: './sample-product-size.component.html',
  styleUrl: './sample-product-size.component.scss',
})
export class SampleProductSizeComponent {
  readonly sizes = input.required<string[] | undefined>();
  readonly typeControl = BoxButtonType;
  readonly sizeControl = BoxButtonSize;
}
