import { AfterViewInit, Component, OnInit } from '@angular/core';
import postscribe from 'postscribe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor() {
  }



    ngAfterViewInit() {

      postscribe('#screener', `
<!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container">
  <div class="tradingview-widget-container__widget"></div>
<!--  <div class="tradingview-widget-copyright"><a href="https://ru.tradingview.com/screener/" rel="noopener" target="_blank"><span class="blue-text">Скринер акций</span></a> от TradingView</div>-->
  <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-screener.js" async>
  {
  "width": "100%",
  "height": "100%",
  "defaultColumn": "overview",
  "defaultScreen": "top_gainers",
  "market": "america",
  "showToolbar": true,
  "colorTheme": "light",
  "locale": "ru",
  "isTransparent": true,
  "largeChartUrl": "http://localhost:4205/#/detail/"
}
  </script>
</div>
<!-- TradingView Widget END -->

    `);


    }



  ngOnInit(): void {
  }

}
