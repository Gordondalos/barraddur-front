import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ThemeService } from '../services/theme.service';
import { PortfolioService } from '../services/portfolio.service';
import { AuthService } from '../services/auth.service';
import { LocalstorageService } from '../services/localstorage.service';
import postscribe from 'postscribe';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Input() sidenav: MatSidenav;
  themeSelect: string;
  balance: Array<{ currency: string, balance: number }>;

  constructor(
    public themeService: ThemeService,
    private portfolioService: PortfolioService,
    private authService: AuthService,
    private localstorageService: LocalstorageService,
  ) {
    this.portfolioService.updateBalanceEvent.subscribe((res) => {
      this.getBalance().then();
    });
  }

  ngAfterViewInit() {

    postscribe('#mydivHeader', `
   <!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container">
  <div class="tradingview-widget-container__widget"></div>
  <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-tickers.js" async>
  {
  "symbols": [
    {
      "proName": "FOREXCOM:SPXUSD",
      "title": "S&P 500"
    },
    {
      "proName": "FOREXCOM:NSXUSD",
      "title": "NASDAQ 100"
    },
    {
      "proName": "FX_IDC:EURUSD",
      "title": "EUR/USD"
    },
    {
      "proName": "BITSTAMP:BTCUSD",
      "title": "BTC/USD"
    }
  ],
  "colorTheme": "dark",
  "isTransparent": true,
  "locale": "ru"
}
  </script>
</div>
<!-- TradingView Widget END -->
    `);


  }

  async ngOnInit(): Promise<any> {
    const user = this.localstorageService.get('user');
    if (user) {
      this.getBalance().then();
    }
  }

  async getBalance(): Promise<void> {
    this.balance = await this.portfolioService.getBalance();
  }

  changeThemeColor(theme) {
    this.themeService.applyTheme(theme);
  }

  logout() {
    this.authService.logOut().then();
  }
}
