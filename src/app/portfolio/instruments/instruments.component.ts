import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { InstrumentInterface, Order } from '../../interfaces/instrumentInterface';
import { LocalstorageService } from '../../services/localstorage.service';
import { PortfolioService } from '../../services/portfolio.service';
import { StockService } from '../../services/stock.service';
import { SocketService } from '../../services/socket.service';
import { SocketEventInterface } from '../../interfaces/socketEvent.interface';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { OrderInfoInterface } from '../../interfaces/order-info.interface';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.scss'],
})
export class InstrumentsComponent implements OnInit, OnDestroy {


  @Input() portfolio: Array<InstrumentInterface>;

  gridColumnApi: any;
  gridOptionsApi: any;
  gridApi: any;
  balance: Array<{ currency: string, balance: number }>;

  settings: any;
  show = true;
  orders: Array<Order>;
  orderInfo: Array<OrderInfoInterface> = [];

  //
  // columnDefs = [
  //   { headerName: 'id', field: 'figi', sortable: true, filter: true, resizable: true },
  //   { headerName: 'name', field: 'name', sortable: true, filter: true, resizable: true },
  //   // { headerName: 'balance', field: 'balance', sortable: true, filter: true, resizable: true },
  //   { headerName: 'ticker', field: 'ticker', sortable: true, filter: true, resizable: true },
  //   { headerName: 'lots', field: 'lots', sortable: true, filter: true, resizable: true },
  //   { headerName: 'price', field: 'price', sortable: true, filter: true, resizable: true },
  //   { headerName: 'blocked', field: 'blocked', sortable: true, filter: true, resizable: true },
  //   // { headerName: 'average', field: 'average', sortable: true, filter: true, resizable: true },
  //   // { headerName: 'Income', field: 'income_total', sortable: true, filter: true, resizable: true },
  //   // { headerName: 'Inc %', field: 'income_percent_total', sortable: true, filter: true, resizable: true },
  //   // { headerName: 'Inc day', field: 'income_day', sortable: true, filter: true, resizable: true },
  //   // { headerName: 'Inc day %', field: 'income-day_percent', sortable: true, filter: true, resizable: true },
  // ];


  private unsubscribeAll: Subject<any> = new Subject<any>();


  constructor(
    private portfolioService: PortfolioService,
    private stockService: StockService,
    public localStorageService: LocalstorageService,
    public socketService: SocketService,
    private router: Router,
    private localstorageService: LocalstorageService,
  ) {

    this.portfolioService.updateBalanceEvent.subscribe((res) => {
      this.getBalance().then();
    });

    this.router.events
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((res) => {
        if (res instanceof NavigationEnd) {
          if (this.router.url.indexOf('portfolio') === -1) {
            // this.socketService.disconnect();
          }
        }
      });

    this.stockService.updateInstrumentsList
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.show = false;
        this.uploadPortfolio();
        this.show = true;
      });

    this.socketService.eventSocketUpdate
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((event: SocketEventInterface) => {
        this.updateDataInPortfolio(event);
      });

  }

  ngOnInit() {
    this.settings = this.localStorageService.get('gridPortfoloSettings');
    // this.show = window.innerWidth > 968;
    this.show = false;

    const user = this.localstorageService.get('user');
    if (user) {
      this.getBalance().then();
    }
    this.getActiveOrders();
    this.getPriceFromPortfolio();

  }

  getUserAccounts() {
    this.portfolioService.getUserAccounts()
      .then((res) => {
        console.log(res);
      });
  }


  async getActiveOrders() {
    this.orders = await this.portfolioService.getActiveOrders();
    if (this.orders && this.orders.length) {
      this.stockService.getInfoAboutOrders(this.orders)
        .then((res) => {
          if (res) {
            this.orderInfo = [];
            for (const item of this.orders) {
              let it = res.find((iter) => iter.figi === item.figi);
              it = { ...it, ...item };
              this.orderInfo.push(it);
            }
          }
        });
    } else {
      this.orderInfo = [];
    }

  }

  async getPriceFromPortfolio() {
    const res: any = await this.portfolioService.getPortfolioWithPrice(this.portfolio);
    if (res && res.length) {
      this.portfolio = res;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }

  updateDataInPortfolio(event: SocketEventInterface) {
    // console.log(event);
    for (const item of this.portfolio) {
      if (item.figi === event.payload.figi) {
        item.price = event.payload.c;
      }
    }
  }

  // onFirstDataRendered(params) {
  //   params.api.sizeColumnsToFit();
  // }

  // onGridReady(params) {
  //   this.gridApi = params.api;
  //   this.gridColumnApi = params.columnApi;
  //   this.gridOptionsApi = this.gridApi.gridCore.gridOptions.api;
  //
  //   this.gridApi.forEachNode((rowNode, index) => {
  //     rowNode.id = this.portfolio[ index ].figi;
  //     // this.gridApi.redrawRows({rowNode});
  //   });
  //   // this.gridApi.redrawRows({rowNode})
  //
  //   if (this.settings) {
  //     this.gridColumnApi.setColumnState(this.settings);
  //   }
  // }


  saveSettings() {
    this.settings = this.gridColumnApi.getColumnState();
    this.localStorageService.set('gridPortfoloSettings', this.settings);
  }

  // columnMoved() {
  //   setTimeout(() => {
  //     this.saveSettings();
  //   }, 1000);
  // }

  // rowClick($event: any) {
  //   console.log($event);
  // }

  // updateData() {
  //   this.portfolioService.updateData(365);
  // }

  async uploadPortfolio() {
    const portfolio = await this.portfolioService.getPortfolio();
    for (const item of portfolio) {
      item.id = item.figi;
    }
    this.portfolio = portfolio;
  }

  openDetail(item: InstrumentInterface | Order) {
    this.router.navigateByUrl(`/portfolio/detail/${ item.figi }`);
    setTimeout(() => {
      this.portfolioService.instrumentEvent.next(item);
    }, 10);
  }

  async getBalance(): Promise<void> {
    const info = await this.portfolioService.getBalance();
    if (info) {
      this.balance = info.filter((item) => item.balance > 0);
    }

  }

  cancelOrder(item: Order, $event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.stockService.cancelOrder(item)
      .then((res) => {
        if (res) {
          this.getActiveOrders();
        }

      });
  }
}

