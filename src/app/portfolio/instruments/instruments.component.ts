import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { InstrumentInterfase } from '../../interfaces/instrument.interfase';
import { LocalstorageService } from '../../services/localstorage.service';
import { PortfolioService } from '../../services/portfolio.service';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.scss'],
})
export class InstrumentsComponent implements OnInit {


  @Input() portfolio: Array<InstrumentInterfase>;

  gridColumnApi: any;
  gridApi: any;

  settings: any;


  columnDefs = [
    { headerName: 'name', field: 'name', sortable: true, filter: true, resizable: true },
    // { headerName: 'balance', field: 'balance', sortable: true, filter: true, resizable: true },
    { headerName: 'lots', field: 'lots', sortable: true, filter: true, resizable: true },
    { headerName: 'blocked', field: 'blocked', sortable: true, filter: true, resizable: true },
    { headerName: 'ticker', field: 'ticker', sortable: true, filter: true, resizable: true },
    { headerName: 'average', field: 'average', sortable: true, filter: true, resizable: true },
    { headerName: 'Income', field: 'income_total', sortable: true, filter: true, resizable: true },
    { headerName: 'Inc %', field: 'income_percent_total', sortable: true, filter: true, resizable: true },
    { headerName: 'Inc day', field: 'income_day', sortable: true, filter: true, resizable: true },
    { headerName: 'Inc day %', field: 'income-day_percent', sortable: true, filter: true, resizable: true },
  ];


  constructor(
    private portfolioService: PortfolioService,
    private stockService: StockService,
    public localStorageService: LocalstorageService,
  ) {
    this.stockService.updateInstrumentsList.subscribe(() => {
      this.uploadPortfolio();
    });

  }

  ngOnInit() {
    this.settings = this.localStorageService.get('gridPortfoloSettings');

  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
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

