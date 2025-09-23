import { NgStyle } from '@angular/common';
import {
  Component,
  inject,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';
import { BoxButtonType } from '@interface/enums';
import { CartItem, QuantityControl } from '@interface/interfaces';
import { TransformColorsPipe } from '@interface/pipes';
import { CartService } from '@interface/services';
import { BoxButtonComponent } from '@shared/box-button';
import { ButtonComponent } from '@shared/button';

@Component({
  selector: 'app-product-controls',
  imports: [NgStyle, ButtonComponent, BoxButtonComponent, TransformColorsPipe],
  standalone: true,
  templateUrl: './product-controls.component.html',
  styleUrl: './product-controls.component.scss',
})
export class ProductControlsComponent {
  readonly product = input.required<CartItem>();
  readonly onRemove = output<string>();
  readonly onChangeQuantity = output<CartItem>();
  readonly updatedQuantity = linkedSignal(() => this.product().quantity);
  readonly typeControl = BoxButtonType;

  onRemoveProduct() {
    this.onRemove.emit(this.product().id);
  }

  changeQuantity({ action }: QuantityControl) {
    this.updatedQuantity.update((prev) =>
      action === 'sum' ? Number(prev) + 1 : Number(prev) - 1
    );

    const updated: CartItem = {
      ...this.product(),
      quantity: this.updatedQuantity(),
    };

    this.onChangeQuantity.emit(updated);
  }
}
