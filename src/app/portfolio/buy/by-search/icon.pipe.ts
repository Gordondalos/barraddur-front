import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icon',
})
export class IconPipe implements PipeTransform {

  transform(value: string, type: string): string {
    switch (type) {
      case 'Bonds':
        return 'Bond';
      case 'Currency':
        return '¤';
      default:
        return value;
    }
  }

}
