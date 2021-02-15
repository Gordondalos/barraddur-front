import { Pipe, PipeTransform } from '@angular/core';
import { InstrumentInterface } from '../interfaces/instrumentInterface';

@Pipe({
  name: 'filterInstruments'
})
export class FilterInstrumentsPipe implements PipeTransform {

  transform(value: InstrumentInterface[], args?: any): any {
    if (!value) {
      return value;
    } else {

      return (value.filter(item => (item.name.toLowerCase().indexOf(args.toLowerCase()) !== -1)
          || (item.ticker.toLowerCase().indexOf(args.toLowerCase()) !== -1)
          || (item.figi.toLowerCase().indexOf(args.toLowerCase()) !== -1))
      );
    }
  }

}
