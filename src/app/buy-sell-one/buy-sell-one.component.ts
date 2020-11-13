import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { InstrumentInfoInterface } from '../interfaces/instrument-info.interface';
import { InstrumentInterface } from '../interfaces/instrumentInterface';
import { takeUntil } from 'rxjs/operators';
import { SocketEventInterface } from '../interfaces/socketEvent.interface';
import { SocketService } from '../services/socket.service';
import { PortfolioService } from '../services/portfolio.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-buy-sell-one',
  templateUrl: './buy-sell-one.component.html',
  styleUrls: ['./buy-sell-one.component.scss'],
})
export class BuySellOneComponent implements OnInit, OnDestroy {

  _info: InstrumentInfoInterface;
  price: number;

  _currentInstrument: InstrumentInterface;

  @Input()
  get currentInstrument(): InstrumentInterface {
    return this._currentInstrument;
  }

  set currentInstrument(currentInstrument: InstrumentInterface) {
    this._currentInstrument = currentInstrument;
  }

  @Input() figi: string;


  @Input()
  get info(): InstrumentInfoInterface {
    return this._info;
  }

  set info(info: InstrumentInfoInterface) {
    this._info = info;
  }

  count = 1;
  private unsubscribeAll: Subject<any> = new Subject<any>();
  customPrice: number;

  constructor(
    private socketService: SocketService,
    private portfolioService: PortfolioService,
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
    this.count = this._info.lot;
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }


}
