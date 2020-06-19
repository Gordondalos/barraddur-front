import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { InstrumentInterfase } from '../../interfaces/instrument.interfase';

@Component({
  selector: 'app-instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.scss'],
})
export class InstrumentsComponent implements OnInit {
  @Input() portfolio: Array<InstrumentInterfase>;


  columnDefs = [
    { headerName: 'name', field: 'name', sortable: true, filter: true, resizable: true },
    { headerName: 'balance', field: 'balance', sortable: true, filter: true, resizable: true },
    { headerName: 'lots', field: 'lots', sortable: true, filter: true, resizable: true },
    { headerName: 'blocked', field: 'blocked', sortable: true, filter: true, resizable: true },
    { headerName: 'ticker', field: 'ticker', sortable: true, filter: true, resizable: true },
  ];


  constructor() {

  }

  ngOnInit() {

  }

  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }


}

