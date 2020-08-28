import { Component, Input, OnInit } from '@angular/core';
import { Stock } from '../../interfaces/stock.interface';
import * as _ from 'lodash';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-buy-sell',
  templateUrl: './buy-sell.component.html',
  styleUrls: ['./buy-sell.component.scss'],
})
export class BuySellComponent implements OnInit {

  @Input() instruments: Stock[];
  group: Stock[] = [];
  itemSelecyted: Stock | any;
  options: Stock[] = [];
  copyOptions: Stock[] = [];
  groupName: string;
  currentGroup: any;

  buySell: any = {
    showTrailingStop: false
  };

  constructor(
    private stockService: StockService,
  ) {
  }

  ngOnInit(): void {
    this.options = this.instruments;
    console.log(this.instruments[ 0 ]);
    this.copyOptions = _.cloneDeep(this.options);
  }

  displayFn(stock: Stock): string {
    return stock && stock.name ? stock.name : '';
  }

  filterOptions(): void {
    // debugger
    if (typeof this.buySell.instrument === 'string') {
      this.options = _.filter(this.copyOptions, (item) => {
        return item.name.toLowerCase().indexOf(this.buySell.instrument.toLowerCase()) !== -1 ||
          item.ticker.toLowerCase().indexOf(this.buySell.instrument.toLowerCase()) !== -1;
      });
    } else {
      this.options = _.cloneDeep(this.copyOptions);
    }
  }

  deal(operation: string) {
    this.buySell.operation = operation;
    console.log(this.buySell);
    this.stockService.deal(this.buySell).then(() => {
      this.buySell.instrument = '';
      this.buySell.price = 0;
      this.buySell.count = 0;
      this.buySell.lags = 0;
      this.buySell.showTrailingStop = false;
    });

  }
}
