import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trans',
})
export class TransPipe implements PipeTransform {

  transform(value: any): string {
    switch (value) {
      case 'Bond':
        return $localize`Облигации`;
      case 'Currency':
        return $localize`Валюта`;
      case 'Stock':
        return $localize`Акции`;
      default:
        return value;
    }
  }

}
