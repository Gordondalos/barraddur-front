import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../services/portfolio.service';
import { InstrumentInterfase } from '../interfaces/instrument.interfase';
import * as _ from 'lodash';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit {

  portfolio: Array<InstrumentInterfase>;

  balance: Array<{ currency: string, balance: number }>;

  constructor(
    public portfolioService: PortfolioService,
  ) {
  }

  async ngOnInit(): Promise<any> {
    this.portfolio = await this.portfolioService.getPortfolio();
    this.balance = await this.portfolioService.getBalance();
    console.log(this.portfolio);
  }

}
