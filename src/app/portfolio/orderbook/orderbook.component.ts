import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-orderbook',
  templateUrl: './orderbook.component.html',
  styleUrls: ['./orderbook.component.scss'],
})
export class OrderbookComponent implements OnInit, OnDestroy {

  @Input() currency: string;

  asks: any;
  bids: any;

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    public socketService: SocketService,
  ) {
    this.socketService.eventSocketUpdateOrderBook
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        this.asks = res.asks;
        this.bids = res.bids;
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

}
