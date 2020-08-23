import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../services/portfolio.service';
import { InstrumentInterfase } from '../interfaces/instrument.interfase';
import * as _ from 'lodash';
import { GroupService } from '../services/group.service';
import { Stock } from '../interfaces/stock.interface';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {

  portfolio: Array<InstrumentInterfase>;
  instruments: Stock[];

  balance: Array<{ currency: string, balance: number }>;

  instr: any;

  constructor(
    public portfolioService: PortfolioService,
    private groupService: GroupService,
    private socketService: SocketService,
  ) {
  }

  async ngOnInit(): Promise<any> {
    this.portfolio = await this.portfolioService.getPortfolio();
    this.balance = await this.portfolioService.getBalance();
    console.log(this.portfolio);
    const res = await this.groupService.getData();
    this.instruments = res.result.instruments;

    this.socketService.startSubscribtion(this.portfolio);
    this.socketService.connect();
  }

}
