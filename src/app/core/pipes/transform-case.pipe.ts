import { Pipe, PipeTransform } from '@angular/core';

type TypeTransform = 'upper' | 'lower';

@Pipe({
  name: 'transformCase',
})
export class TransformCasePipe implements PipeTransform {
  transform(value: string | undefined, to: TypeTransform): string {
    if (!value) {
      return '';
    }

    return to === 'lower' ? value.toLowerCase() : value.toUpperCase();
  }
}
