import { Pipe, PipeTransform } from '@angular/core';

type TypeTransform = 'upper' | 'lower';

@Pipe({
  name: 'transformColors',
})
export class TransformColorsPipe implements PipeTransform {
  transform(value: string | undefined): Record<string, string> {
    const colors: Record<string, string> = {
      azul: 'blue',
      rojo: 'red',
      negro: 'black',
      naranja: 'orange',
      blanco: 'white',
      verde: 'green',
    };

    if (!value) {
      background: 'white';
    }

    return {
      background: colors[value!],
    };
  }
}
