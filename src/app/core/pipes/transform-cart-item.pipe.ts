import { Pipe, PipeTransform } from '@angular/core';
import { CartItem, Product } from '@interface/interfaces';

@Pipe({
  name: 'transformCartItem',
})
export class TransformCartItemPipe implements PipeTransform {
  transform(item: CartItem): Product {
    const { colorSelected, sizeSelected, quantity, ...product } = item;
    return product;
  }
}
