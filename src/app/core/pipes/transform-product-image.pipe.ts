import { Pipe, PipeTransform } from '@angular/core';
import { CartItem } from '@interface/interfaces';

@Pipe({
  name: 'transformProductImage',
})
export class TransformProductImagePipe implements PipeTransform {
  transform(value: CartItem): string {
    if (!value?.color) {
      return value.imageUrl;
    }

    const match = value.color.find((c) => c.color === value.colorSelected);
    return match ? match.imageUrl : value.imageUrl;
  }
}
