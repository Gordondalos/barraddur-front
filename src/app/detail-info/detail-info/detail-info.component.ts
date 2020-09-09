import { AfterViewInit, Component, OnInit } from '@angular/core';
import postscribe from 'postscribe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.scss'],
})
export class DetailInfoComponent implements OnInit, AfterViewInit {

  simbol: string;

  constructor(
    private activateRouter: ActivatedRoute,
  ) {
    const params = this.activateRouter.snapshot.queryParams;
    this.simbol = params.tvwidgetsymbol;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {

    postscribe('#strela', `
    <!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container">
  <div class="tradingview-widget-container__widget"></div>
  <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js" async>
  {
  "interval": "1D",
  "width": "100%",
  "isTransparent": true,
  "height": "450",
  "symbol": "${this.simbol}",
  "showIntervalTabs": true,
  "locale": "ru",
  "colorTheme": "light"
}
  </script>
</div>
<!-- TradingView Widget END -->
    `)

    postscribe('#graf', `
<!-- TradingView Widget BEGIN -->
<!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container w100 h100">

  <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
  <script type="text/javascript">
  new TradingView.widget(
  {
  "autosize": true,
  "symbol": "${this.simbol}",
  "interval": "D",
  "timezone": "Etc/UTC",
  "theme": "light",
  "style": "1",
  "locale": "ru",
  "toolbar_bg": "#f1f3f6",
  "enable_publishing": false,
  "withdateranges": true,
  "hide_side_toolbar": false,
  "allow_symbol_change": true,

}
  );
  </script>
</div>
<!-- TradingView Widget END -->
<!-- TradingView Widget END -->
    `);

//     postscribe('#desc', `
//     <!-- TradingView Widget BEGIN -->
// <div class="tradingview-widget-container">
//   <div class="tradingview-widget-container__widget"></div>
//   <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js" async>
//   {
//   "symbol": "${this.simbol}",
//   "width": "100%",
//   "height": "450",
//   "colorTheme": "light",
//   "isTransparent": true,
//   "locale": "ru"
// }
//   </script>
// </div>
// <!-- TradingView Widget END -->
//     `)

    postscribe('#info', `
<!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container">
  <div class="tradingview-widget-container__widget"></div>
  <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-financials.js" async>
  {
  "symbol": "${this.simbol}",
  "colorTheme": "light",
  "isTransparent": true,
  "largeChartUrl": "",
  "displayMode": "regular",
  "width": "100%",
  "height": "100%",
  "locale": "ru"
}
  </script>
</div>
<!-- TradingView Widget END -->

    `);


  }


}
