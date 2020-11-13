import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { InstrumentInfoInterface } from '../../interfaces/instrument-info.interface';
import { takeUntil } from 'rxjs/operators';
import { SocketEventInterface } from '../../interfaces/socketEvent.interface';
import { SocketService } from '../../services/socket.service';
import { Subject } from 'rxjs';
import { PortfolioService } from '../../services/portfolio.service';
import * as _ from 'lodash';
import { InstrumentInterface } from '../../interfaces/instrumentInterface';

@Component({
  selector: 'app-count-info',
  templateUrl: './count-info.component.html',
  styleUrls: ['./count-info.component.scss'],
})
export class CountInfoComponent implements OnInit, OnDestroy {

  _info: InstrumentInfoInterface;
  price: number;

  @Input() figi: string;
  currentInstrument: InstrumentInterface;

  @Input()
  get info(): InstrumentInfoInterface {
    return this._info;
  }

  set info(info: InstrumentInfoInterface) {
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


  async ngOnInit(): Promise<void> {
    const portfolio = await this.portfolioService.getPortfolio();
    this.currentInstrument = _.find(portfolio, (item) => item.figi === this.figi);
    console.log(this.currentInstrument);
  }

}
