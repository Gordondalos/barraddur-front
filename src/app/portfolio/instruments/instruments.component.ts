import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { InstrumentInterface } from '../../interfaces/instrumentInterface';
import { LocalstorageService } from '../../services/localstorage.service';
import { PortfolioService } from '../../services/portfolio.service';
import { StockService } from '../../services/stock.service';
import { SocketService } from '../../services/socket.service';
import { SocketEventInterface } from '../../interfaces/socketEvent.interface';
import * as _ from 'lodash';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.scss'],
})
export class InstrumentsComponent implements OnInit {


  @Input() portfolio: Array<InstrumentInterface>;

  gridColumnApi: any;
  gridOptionsApi: any;
  gridApi: any;

  settings: any;


  columnDefs = [
    { headerName: 'id', field: 'figi', sortable: true, filter: true, resizable: true },
    { headerName: 'name', field: 'name', sortable: true, filter: true, resizable: true },
    // { headerName: 'balance', field: 'balance', sortable: true, filter: true, resizable: true },
    { headerName: 'ticker', field: 'ticker', sortable: true, filter: true, resizable: true },
    { headerName: 'lots', field: 'lots', sortable: true, filter: true, resizable: true },
    { headerName: 'price', field: 'price', sortable: true, filter: true, resizable: true },
    { headerName: 'blocked', field: 'blocked', sortable: true, filter: true, resizable: true },
    // { headerName: 'average', field: 'average', sortable: true, filter: true, resizable: true },
    // { headerName: 'Income', field: 'income_total', sortable: true, filter: true, resizable: true },
    // { headerName: 'Inc %', field: 'income_percent_total', sortable: true, filter: true, resizable: true },
    // { headerName: 'Inc day', field: 'income_day', sortable: true, filter: true, resizable: true },
    // { headerName: 'Inc day %', field: 'income-day_percent', sortable: true, filter: true, resizable: true },
  ];


  constructor(
    private portfolioService: PortfolioService,
    private stockService: StockService,
    public localStorageService: LocalstorageService,
    public socketService: SocketService,
    private router: Router,
  ) {
    this.router.events.subscribe((res) => {
      if (res instanceof NavigationEnd) {
        if (this.router.url.indexOf('portfolio') === -1) {
          this.socketService.disconnect();
        }
      }
    });

    this.stockService.updateInstrumentsList.subscribe(() => {
      this.uploadPortfolio();
    });
    this.socketService.eventSocketUpdate.subscribe((event: SocketEventInterface) => {
      // console.log(event.payload.figi);
      this.updateDataInPortfolio(event);

    });

  }

  ngOnInit() {
    this.settings = this.localStorageService.get('gridPortfoloSettings');
  }

  updateDataInPortfolio(event: SocketEventInterface) {
    // console.log(event)
    // const portfolio = _.cloneDeep(this.portfolio);
    // for (const item of portfolio) {
    //   if (item.figi === event.payload.figi) {
    //     item.price = event.payload.c;
    //   }
    // }
    // this.portfolio = _.cloneDeep(portfolio);

    this.gridApi.forEachNode((node) => {
      if (node.id === event.payload.figi) {
        const data = node.data;
        data.price = event.payload.c;
        node.setData(data);
        console.log(data.name, data.price);
      }
    });


  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridOptionsApi = this.gridApi.gridCore.gridOptions.api;

    this.gridApi.forEachNode((rowNode, index) => {
      rowNode.id = this.portfolio[ index ].figi;
      // this.gridApi.redrawRows({rowNode});
    });
    // this.gridApi.redrawRows({rowNode})

    // debugger
    if (this.settings) {
      this.gridColumnApi.setColumnState(this.settings);
    }
  }


  saveSettings() {
    this.settings = this.gridColumnApi.getColumnState();
    this.localStorageService.set('gridPortfoloSettings', this.settings);
  }

  columnMoved() {
    setTimeout(() => {
      this.saveSettings();
    }, 1000);
  }

  rowClick($event: any) {
    console.log($event);
  }

  updateData() {
    this.portfolioService.updateData(365);
  }

  async uploadPortfolio() {
    this.portfolio = await this.portfolioService.getPortfolio();
  }
}

