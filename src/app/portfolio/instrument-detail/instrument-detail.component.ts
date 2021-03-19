import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChartComponent, ChartType } from 'ng-apexcharts';
// import { ChartOptions } from '../../interfaces/chart-options.interface';
import { PortfolioService } from '../../services/portfolio.service';
import * as moment from 'moment';
import { CandleInterfase } from '../../interfaces/candle.interfase';
import { ChartOptions } from '../../interfaces/chart-options.interface';
import { InstrumentInfoInterface } from '../../interfaces/instrument-info.interface';
import { takeUntil } from 'rxjs/operators';
import { SocketEventInterface } from '../../interfaces/socketEvent.interface';
import { SocketService } from '../../services/socket.service';
import { Subject } from 'rxjs';
import { InstrumentInterface } from '../../interfaces/instrumentInterface';
import * as _ from 'lodash';
import { BuySellOneComponent } from '../../buy-sell-one/buy-sell-one.component';
import { DinamicLoaderService } from '../../services/dinamic-loader.service';
import { SidenavService } from '../../services/sidenav.service';
import { CandleResolution } from '../../auth/interfaces/candle-resolution';
import { Moment } from 'moment';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-instrument-detail',
  templateUrl: './instrument-detail.component.html',
  styleUrls: ['./instrument-detail.component.scss'],
})
export class InstrumentDetailComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('chartCandle') chartCandle: ChartComponent;
  @ViewChild('chartBar') chartBar: ChartComponent;
  public chartCandleOptions: Partial<ChartOptions>;
  public chartBarOptions: Partial<ChartOptions>;

  figi: string;
  info: InstrumentInfoInterface;
  price: number;
  currentInstrument: InstrumentInterface;
  interval: CandleResolution = 'day';

  private unsubscribeAll: Subject<any> = new Subject<any>();
  private min: any;
  chartType: ChartType = 'line';
  lastCandles: any;
  lastAllData: any;
  lastAllDataValue: any;
  private allData: any;
  private chart: any;


  constructor(
    public route: ActivatedRoute,
    private portfolioService: PortfolioService,
    private socketService: SocketService,
    private dinamicLoaderService: DinamicLoaderService,
    public sidenavService: SidenavService,
  ) {
    this.figi = route.snapshot.params.figi;
    this.socketService.eventSocketUpdate
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((event: SocketEventInterface) => {
        if (event.payload.figi === this.figi) {
          this.price = event.payload.c;
          this.lastCandles = event.payload;
          this.addCandleToChart(this.lastCandles);
        }
      });

    this.portfolioService.portfolioUpdateEvent
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((portfolio) => {
        this.currentInstrument = _.find(portfolio, (item) => item.figi === this.figi);
      });
  }

  drawChart(){

    /* Chart code */
// Themes begin
    am4core.useTheme(am4themes_animated);
// Themes end

    this.chart = am4core.create('chartdiv', am4charts.XYChart);
    this.chart.paddingRight = 20;

    this.chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd';

    const dateAxis = this.chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    const valueAxis = this.chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;

    const series = this.chart.series.push(new am4charts.CandlestickSeries());
    series.dataFields.dateX = 'time';
    series.dataFields.valueY = 'c';
    series.dataFields.openValueY = 'o';
    series.dataFields.lowValueY = 'l';
    series.dataFields.highValueY = 'h';
    series.tooltipText = 'Open:${openValueY.value}\nLow:${lowValueY.value}\nHigh:${highValueY.value}\nClose:${valueY.value}';

// important!
// candlestick series colors are set in states.
// series.riseFromOpenState.properties.fill = am4core.color("#00ff00");
// series.dropFromOpenState.properties.fill = am4core.color("#FF0000");
// series.riseFromOpenState.properties.stroke = am4core.color("#00ff00");
// series.dropFromOpenState.properties.stroke = am4core.color("#FF0000");

    series.riseFromPreviousState.properties.fillOpacity = 1;
    series.dropFromPreviousState.properties.fillOpacity = 0;

    this.chart.cursor = new am4charts.XYCursor();

// a separate series for scrollbar
    const lineSeries = this.chart.series.push(new am4charts.LineSeries());
    lineSeries.dataFields.dateX = 'time';
    lineSeries.dataFields.valueY = 'c';
// need to set on default state, as initially series is "show"
    lineSeries.defaultState.properties.visible = false;

// hide from legend too (in case there is one)
    lineSeries.hiddenInLegend = true;
    lineSeries.fillOpacity = 0.5;
    lineSeries.strokeOpacity = 0.5;

    const scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(lineSeries);
    this.chart.scrollbarX = scrollbarX;

  }

  ngAfterViewInit() {

    this.drawChart();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    this.socketService.unSubscribeInstrument(this.info).then();
  }

  addCandleToChart(candle) {
    if (this.chartCandle) {
      const result = this.drawCandleData([candle]);
      this.lastAllData = this.lastAllData ? this.lastAllData : [];
      this.lastAllDataValue = this.lastAllDataValue ? this.lastAllDataValue : [];
      this.lastAllData = [...this.lastAllData, ...result.data];
      this.lastAllDataValue = [...this.lastAllDataValue, ...result.val];
      (this.chartCandle.series[ 0 ] as any).data = this.lastAllData;
      // console.log(this.chartCandle);
      (this.chartBar.series[ 0 ] as any).data = this.lastAllDataValue;
    }
  }

  async ngOnInit(): Promise<any> {
    this.info = await this.portfolioService.getInfoByFigi(this.figi);
    this.socketService.subscribeInstrument(this.info).then();

    this.init();
    const portfolio = await this.portfolioService.getPortfolio();
    this.currentInstrument = _.find(portfolio, (item) => item.figi === this.figi);
  }

  loadInterval(interval: CandleResolution) {
    this.interval = interval;
    this.init();
  }

  reformat(){

  }


  async init(): Promise<void> {
    this.sidenavService.showSpiner.next(true);

    let from: string;
    let to: string;
    let fr: Moment;
    let toe: Moment;

    switch (this.interval) {
      case '1min': {
        fr = moment().subtract(1, 'day');
        toe = moment();
        from = fr.format('DD-MM-YYYY HH:mm');
        to = toe.format('DD-MM-YYYY HH:mm');
        this.min = new Date(moment().subtract(1, 'day').toISOString()).getTime();
        break;
      }
      case '2min': {
        fr = moment().subtract(1, 'day');
        toe = moment();
        from = fr.format('DD-MM-YYYY HH:mm');
        to = toe.format('DD-MM-YYYY HH:mm');
        this.min = new Date(moment().subtract(1, 'day').toISOString()).getTime();
        break;
      }
      case '3min': {
        fr = moment().subtract(1, 'day');
        toe = moment();
        from = fr.format('DD-MM-YYYY HH:mm');
        to = toe.format('DD-MM-YYYY HH:mm');
        this.min = new Date(moment().subtract(1, 'day').toISOString()).getTime();
        break;
      }
      case '5min': {
        fr = moment().subtract(1, 'day');
        toe = moment();
        from = fr.format('DD-MM-YYYY HH:mm');
        to = toe.format('DD-MM-YYYY HH:mm');
        this.min = new Date(moment().subtract(1, 'day').toISOString()).getTime();
        break;
      }
      case '10min': {
        fr = moment().subtract(1, 'day');
        toe = moment();
        from = fr.format('DD-MM-YYYY HH:mm');
        to = toe.format('DD-MM-YYYY HH:mm');
        this.min = new Date(moment().subtract(1, 'day').toISOString()).getTime();
        break;
      }
      case '15min': {
        fr = moment().subtract(1, 'day');
        toe = moment();
        from = fr.format('DD-MM-YYYY HH:mm');
        to = toe.format('DD-MM-YYYY HH:mm');
        this.min = new Date(moment().subtract(1, 'day').toISOString()).getTime();
        break;
      }
      case '30min': {
        fr = moment().subtract(1, 'day');
        toe = moment();
        from = fr.format('DD-MM-YYYY HH:mm');
        to = toe.format('DD-MM-YYYY HH:mm');
        this.min = new Date(moment().subtract(2, 'day').toISOString()).getTime();
        break;
      }
      case 'hour': {
        fr = moment().subtract(7, 'day');
        toe = moment();
        from = fr.format('DD-MM-YYYY HH:mm');
        to = toe.format('DD-MM-YYYY HH:mm');
        this.min = new Date(moment().subtract(2, 'day').toISOString()).getTime();
        break;
      }
      case 'day': {
        fr = moment().subtract(365, 'day');
        toe = moment();
        from = fr.format('DD-MM-YYYY HH:mm');
        to = toe.format('DD-MM-YYYY HH:mm');
        this.min = new Date(moment().subtract(40, 'day').toISOString()).getTime();
        break;
      }
      case 'week': {
        fr = moment().subtract(720, 'day');
        toe = moment();
        from = fr.format('DD-MM-YYYY HH:mm');
        to = toe.format('DD-MM-YYYY HH:mm');
        this.min = new Date(moment().subtract(6, 'month').toISOString()).getTime();
        break;
      }
      case 'month': {
        fr = moment().subtract(36, 'month');
        toe = moment();
        from = fr.format('DD-MM-YYYY HH:mm');
        to = toe.format('DD-MM-YYYY HH:mm');
        this.min = new Date(moment().subtract(10, 'month').toISOString()).getTime();
        break;
      }
    }

    const res = await this.portfolioService.getCandleFigiPeriod(this.figi, from, to, this.interval);
    if (res) {
      this.allData = res;
      console.log(this.allData);

      this.chart.data = this.allData.candles;
      // const result = this.reformatCandles(res.candles);

      // this.lastAllData = result.data;
      // if (this.lastCandles) {
      //   const last = this.drawCandleData([this.lastCandles]);
      //   this.lastAllData = [...result.data, ...last.data];
      // }

      // this.chartCandleOptions = {
      //   series: [
      //     {
      //       name: `${ this.info.name }`,
      //       data: this.lastAllData,
      //     },
      //   ],
      //   title: {
      //     text: this.info.name,
      //     align: 'left',
      //   },
      //
      //   stroke: {
      //     curve: 'smooth',
      //     width: 2,
      //   },
      //
      //   chart: {
      //     type: this.chartType,
      //
      //     height: 250,
      //     id: 'candles',
      //     stacked: false,
      //     toolbar: {
      //       show: true,
      //       offsetX: 0,
      //       offsetY: 0,
      //       tools: {
      //         download: true,
      //         selection: true,
      //         zoom: true,
      //         zoomin: true,
      //         zoomout: true,
      //         pan: false,
      //         reset: false,
      //       },
      //     },
      //
      //     events: {
      //       updated: (event) => {
      //         // console.log(event);
      //       },
      //     },
      //   },
      //
      //   plotOptions: {
      //
      //     candlestick: {
      //       colors: {
      //         upward: '#379903',
      //         downward: '#e9032d',
      //       },
      //     },
      //   },
      //   yaxis: {
      //     // max: 53,
      //     // min: 50,
      //     // forceNiceScale: false,
      //     tickAmount: 4,
      //     floating: false,
      //     showForNullSeries: true,
      //     logarithmic: false,
      //     tooltip: {
      //       enabled: true,
      //     },
      //     opposite: true,
      //     labels: {
      //       show: true,
      //       align: 'right',
      //     },
      //   },
      //   xaxis: {
      //     type: 'datetime',
      //     tickAmount: 10,
      //     labels: {
      //       formatter: (val) => {
      //         switch (this.interval) {
      //           case '1min':
      //             return moment(val).format('DD.MM.YYYY HH:mm');
      //           case '2min':
      //             return moment(val).format('DD.MM.YYYY HH:mm');
      //           case '3min':
      //             return moment(val).format('DD.MM.YYYY HH:mm');
      //           case '5min':
      //             return moment(val).format('DD.MM.YYYY HH:mm');
      //           case '10min':
      //             return moment(val).format('DD.MM.YYYY HH:mm');
      //           case '15min':
      //             return moment(val).format('DD.MM.YYYY HH:mm');
      //           case '30min':
      //             return moment(val).format('DD.MM.YYYY HH:mm');
      //           case 'hour':
      //             return moment(val).format('DD.MM.YYYY HH:mm');
      //           case 'day':
      //             return moment(val).format('DD.MM.YYYY');
      //           case 'week':
      //             return moment(val).format('DD.MM.YYYY');
      //           case 'month':
      //             return moment(val).format('DD.MM.YYYY');
      //         }
      //         return moment(val).format('DD.MM.YYYY');
      //       },
      //     },
      //   },
      //
      //   tooltip: {
      //     enabled: true,
      //   },
      // };
      //
      // this.lastAllDataValue = result.val;
      // this.chartBarOptions = {
      //   series: [
      //     {
      //       name: 'volume',
      //       data: this.lastAllDataValue,
      //     },
      //   ],
      //   chart: {
      //     height: 150,
      //     type: 'bar',
      //     brush: {
      //       enabled: true,
      //       target: 'candles',
      //     },
      //     selection: {
      //       enabled: true,
      //       xaxis: {
      //         // этот параметр показывает сколько дней захватить в отображении
      //         min: this.min,
      //         max: new Date(toe.toISOString()).getTime(),
      //       },
      //       fill: {
      //         color: '#ccc',
      //         opacity: 0.4,
      //       },
      //       stroke: {
      //         color: '#0D47A1',
      //       },
      //     },
      //   },
      //   dataLabels: {
      //     enabled: false,
      //   },
      //   title: {
      //     text: 'Объем торгов',
      //     align: 'left',
      //   },
      //   plotOptions: {
      //     bar: {
      //       columnWidth: '80%',
      //       colors: {
      //         ranges: [
      //           {
      //             from: -1000,
      //             to: 0,
      //             color: '#eab616',
      //           },
      //           {
      //             from: 1,
      //             to: 10000,
      //             color: '#04c4e1',
      //           },
      //         ],
      //       },
      //     },
      //   },
      //   stroke: {
      //     width: 0,
      //   },
      //   xaxis: {
      //     type: 'datetime',
      //     axisBorder: {
      //       offsetX: 13,
      //     },
      //   },
      //   yaxis: {
      //     labels: {
      //       show: false,
      //     },
      //   },
      // };
    }
    this.sidenavService.showSpiner.next(false);
  }

  reformatCandles(candles: Array<CandleInterfase>) {
    this.price = candles[ candles.length - 1 ].c;
    const last = { payload: candles[ candles.length - 1 ] };
    this.socketService.eventSocketUpdate.next(last);
    return this.drawCandleData(candles);
  }

  drawCandleData(candles) {
    const data = [];
    const val = [];
    for (const item of candles) {
      const date = new Date(moment(item.time).toISOString());
      data.push({
        x: date,
        // open, high, low, close
        y: [
          item.o,
          item.h,
          item.l,
          item.c,
        ],
      });

      val.push({
        x: date,
        y: item.v,
      });
    }
    return { data, val };
  }


  opensideNav(trailOnly: boolean) {
    this.dinamicLoaderService.loadComponent$.next({
      component: BuySellOneComponent, data: {
        trailOnly,
        info: this.info,
        figi: this.figi,
        currentInstrument: this.info,
        price: this.price,
        inPortfolio: !!this.currentInstrument,
      },
    });
    setTimeout(() => {
      this.sidenavService.sideNavState$.next(true);
    });
  }


  toggleCandleToLine(type) {
    this.chartType = type;
    this.init();
  }
}
