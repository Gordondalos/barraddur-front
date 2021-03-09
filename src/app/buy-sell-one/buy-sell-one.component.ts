import { Component, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { InstrumentInfoInterface } from '../interfaces/instrument-info.interface';
import { InstrumentInterface } from '../interfaces/instrumentInterface';
import { takeUntil } from 'rxjs/operators';
import { SocketEventInterface } from '../interfaces/socketEvent.interface';
import { SocketService } from '../services/socket.service';
import { PortfolioService } from '../services/portfolio.service';
import { Subject } from 'rxjs';
import { StockService } from '../services/stock.service';
import { SidenavService } from '../services/sidenav.service';

@Component({
  selector: 'app-buy-sell-one',
  templateUrl: './buy-sell-one.component.html',
  styleUrls: ['./buy-sell-one.component.scss'],
})
export class BuySellOneComponent implements OnInit, OnDestroy {

  _currentInstrument: InstrumentInterface | InstrumentInfoInterface;
  buySell: any = {};
  lags = false;
  type = 'market';

  @Input() data: any;
  @Input() currentInstrument: InstrumentInterface;
  @Input() info: InstrumentInfoInterface;
  @Input() figi: string;
  @Input() price: number;

  count = 1;
  private unsubscribeAll: Subject<any> = new Subject<any>();
  customPrice: number;
  inPortfolio: boolean;

  constructor(
    private socketService: SocketService,
    private portfolioService: PortfolioService,
    private stockService: StockService,
    public sidenavService: SidenavService,
  ) {
    this.socketService.eventSocketUpdate
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((event: SocketEventInterface) => {
        if (event.payload.figi === this.figi) {
          this.price = event.payload.c;
        }
      });
  }

  ngOnInit(): void {
    if (this.data) {
      this.info = this.data.info;
      this.currentInstrument = this.data.currentInstrument;
      this.figi = this.data.figi;
      this.price = this.data.price;
      this.inPortfolio = this.data.inPortfolio;
    }
    this.count = this.info.lot;
    this.buySell.lags = 1.5;
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  startTrailingStop() {
    if (this.buySell.lags > 0) {
      const data = {
        lags: this.buySell.lags,
        ticker: this.info.ticker,
        figi: this.info.figi,
        instrument: this.info,
        price: this.type === 'market' ? this.price : this.customPrice
      };

      this.stockService.trailingStart(data);
    }

  }


  async deal(operation: string) {
    this.buySell.operation = operation;
    this.buySell.count = this.count;
    this.buySell.price = this.type === 'market' ? this.price : this.customPrice;
    this.buySell.lags = this.buySell.lags && this.lags ? this.buySell.lags : 0;
    this.buySell.instrument = this.info;
    this.count = 0;
    const res = await this.stockService.deal(this.buySell);
    if (res) {
      const portfolio = await this.portfolioService.getPortfolio();
      this.portfolioService.portfolioUpdateEvent.next(portfolio);
      this.buySell.lags = 0;
      this.lags = false;
      this.sidenavService.sideNavState$.next(false);
    }
    setTimeout(() => {
      this.count = this.info.lot;
    }, 5000);
  }

  selectTab(value: string, elem: ElementRef | any) {
    this.type = value;
    elem.nativeElement.scrollIntoView();
  }

}
