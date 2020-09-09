import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PortfolioService } from '../services/portfolio.service';
import { InstrumentInterface } from '../interfaces/instrumentInterface';
import { GroupService } from '../services/group.service';
import { Stock } from '../interfaces/stock.interface';
import { SocketService } from '../services/socket.service';
import postscribe from 'postscribe';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit, AfterViewInit {

  portfolio: Array<InstrumentInterface>;
  instruments: Stock[];

  balance: Array<{ currency: string, balance: number }>;

  instr: any;

  constructor(
    public portfolioService: PortfolioService,
    private groupService: GroupService,
    private socketService: SocketService,
  ) {
  }

  ngAfterViewInit() {
    postscribe('#mydiv', `
    <div class="tradingview-widget-container">
  <div class="tradingview-widget-container__widget"></div>
  <div class="tradingview-widget-copyright"><a href="https://ru.tradingview.com/symbols/NASDAQ-AAPL/technicals/" rel="noopener" target="_blank"><span class="blue-text">Технический анализ AAPL</span></a> от TradingView</div>
    <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js" async>
      {
        "interval": "1m",
        "width": "425",
        "isTransparent": false,
        "height": "450",
        "symbol": "NASDAQ:AAPL",
        "showIntervalTabs": true,
        "locale": "ru",
        "colorTheme": "light"
      }
    </script>
  </div>
    `);
  }

  async ngOnInit(): Promise<any> {

    const portfolio = await this.portfolioService.getPortfolio();
    for (const item of portfolio) {
      item.id = item.figi;
    }
    this.portfolio = portfolio;

    this.balance = await this.portfolioService.getBalance();
    console.log(this.portfolio);
    const res = await this.groupService.getData();
    this.instruments = res.result.instruments;
    await this.socketService.startSubscribtion(this.portfolio);
    // this.socketService.connect();
  }

}
