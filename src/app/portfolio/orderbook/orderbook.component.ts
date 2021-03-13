import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SidenavService } from '../../services/sidenav.service';
import { DinamicLoaderService } from '../../services/dinamic-loader.service';
import { BuySellOneComponent } from '../../buy-sell-one/buy-sell-one.component';

@Component({
  selector: 'app-orderbook',
  templateUrl: './orderbook.component.html',
  styleUrls: ['./orderbook.component.scss'],
})
export class OrderbookComponent implements OnInit, OnDestroy {

  @Input() currency: string;
  @Input() figi: any;
  @Input() info: any;
  @Input() currentInstrument: any;

  asks: any;
  bids: any;

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    public socketService: SocketService,
    public sidenavService: SidenavService,
    private dinamicLoaderService: DinamicLoaderService,
  ) {
    this.socketService.eventSocketUpdateOrderBook
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        if (this.figi === res.figi) {
          this.asks = res.asks;
          this.bids = res.bids;
        }

      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  opensideNav(item: any) {
    this.dinamicLoaderService.loadComponent$.next({
      component: BuySellOneComponent, data: {
        info: this.info,
        figi: this.figi,
        currentInstrument: this.info,
        price: item[ 0 ],
      },
    });
    setTimeout(() => {
      this.sidenavService.sideNavState$.next(true);
    });
  }
}
