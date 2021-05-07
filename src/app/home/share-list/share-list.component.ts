import {Component, OnInit} from '@angular/core';
import {MarketInstrument} from '../../interfaces/marketInstrument.interface';
import {StockService} from '../../services/stock.service';
import {Observable} from 'rxjs';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';


@Component({
  selector: 'app-share-list',
  templateUrl: './share-list.component.html',
  styleUrls: ['./share-list.component.scss']
})
export class ShareListComponent implements OnInit {
  currentValue: MarketInstrument;
  stocks: MarketInstrument [] = [];
  myControl = new FormControl();
  options: MarketInstrument [] = [];
  filteredOptions: Observable<MarketInstrument[]>;

  constructor(
    private stockService: StockService
  ) {
  }

  ngOnInit(): void {
    this.getShareList();
    this.myControl.valueChanges.subscribe((res) => {
      if (typeof res === 'string') {
        return;
      } else {
        this.currentValue = res;
        console.log(this.currentValue);
      }

    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  async getShareList() {
    this.stocks = await this.stockService.getStock();
    this.options = this.stocks;
  }

  private _filter(value: any): MarketInstrument[] {
    let filterValue = '';
    if (typeof value === 'string') {
      filterValue = value.toLowerCase();
    } else {
      filterValue = value.name.toLowerCase();
    }


    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  displayFn(stock: MarketInstrument): string {
    return stock && stock.name ? stock.name : '';
  }

}
