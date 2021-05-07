import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { SocketEventInterface } from '../../interfaces/socketEvent.interface';
import { SocketService } from '../../services/socket.service';
import { Subject } from 'rxjs';
import { PortfolioService } from '../../services/portfolio.service';
import { InstrumentInterface } from '../../interfaces/instrumentInterface';
import { MarketInstrument } from '../../interfaces/marketInstrument.interface';

@Component({
  selector: 'app-count-info',
  templateUrl: './count-info.component.html',
  styleUrls: ['./count-info.component.scss'],
})
export class CountInfoComponent implements OnInit, OnDestroy {

  _info: MarketInstrument;
  price: number;

  @Input() figi: string;

  _currentInstrument: InstrumentInterface;

  @Input()
  get currentInstrument(): InstrumentInterface {
    return this._currentInstrument;
  }

  set currentInstrument(currentInstrument: InstrumentInterface) {
    this._currentInstrument = currentInstrument;
  }


  @Input()
  get info(): MarketInstrument {
    return this._info;
  }

  set info(info: MarketInstrument) {
    this._info = info;
  }

  private unsubscribeAll: Subject<any> = new Subject<any>();

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

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }


  ngOnInit(): void {
    console.log(this.currentInstrument);
    console.log(this.info);

  }

}
