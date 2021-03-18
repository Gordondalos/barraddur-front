import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { OneOperation } from '../../interfaces/operations.interface';
import { InstrumentInfo } from '../../../assets/charting_library/charting_library.min';
import { InstrumentInterface } from '../../interfaces/instrumentInterface';
import { takeUntil } from 'rxjs/operators';
import { SocketEventInterface } from '../../interfaces/socketEvent.interface';
import { Subject } from 'rxjs';
import { SocketService } from '../../services/socket.service';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-history-triling',
  templateUrl: './history-triling.component.html',
  styleUrls: ['./history-triling.component.scss'],
})
export class HistoryTrilingComponent implements OnInit, OnDestroy {
  @Input() figi: string;
  @Input() info: InstrumentInfo;
  @Input() currentInstrument: InstrumentInterface;
  history: any[];
  result: number;
  operations: Array<OneOperation>;
  total = 0;
  price: number;

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private portfolioService: PortfolioService,
    private socketService: SocketService,
    private sidenavService: SidenavService,
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
    // this.portfolioService.getHistoryTrailing(this.figi)
    //   .then((res) => {
    //     this.history = res;
    //     if (this.history && this.history[ 0 ]) {
    //       const last = this.history[ 0 ].stopLossValue;
    //       const first = this.history[ this.history.length - 1 ].stopLossValue;
    //       this.result = (last - first) / first * 100;
    //     }
    //
    //   });
    this.getHistory();
  }

  async getHistory() {
    setTimeout(() => {
      this.sidenavService.showSpiner.next(true);
    }, 10);
    this.operations = await this.portfolioService.getInstrumentOperations({ figi: this.figi });
    console.log('-------------operations--------------');
    console.log('operations', this.operations);
    console.log('-------------operations--------------');

    this.total = 0;
    if (this.operations) {
      this.operations.forEach((item) => {
        if (item.operationType === 'Buy') {
          this.total -= item.payment;
        } else {
          this.total += item.payment;
        }
      });
    }
    this.sidenavService.showSpiner.next(false);
  }


}
