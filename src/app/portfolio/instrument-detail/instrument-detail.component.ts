import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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


@Component({
  selector: 'app-instrument-detail',
  templateUrl: './instrument-detail.component.html',
  styleUrls: ['./instrument-detail.component.scss'],
})
export class InstrumentDetailComponent implements OnInit, OnDestroy {

  @ViewChild('chart') chart: ChartComponent;
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
        }
      });

    this.portfolioService.portfolioUpdateEvent
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((portfolio) => {
        this.currentInstrument = _.find(portfolio, (item) => item.figi === this.figi);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    this.socketService.unSubscribeInstrument(this.info).then();
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
        from = fr.format('DD-MM-YYYY');
        to = toe.format('DD-MM-YYYY');
        this.min = new Date(moment().subtract(1, 'day').toISOString()).getTime();
        break;
      }
      case '2min': {
        fr = moment().subtract(1, 'day');
        toe = moment();
        from = fr.format('DD-MM-YYYY');
        to = toe.format('DD-MM-YYYY');
        this.min = new Date(moment().subtract(1, 'day').toISOString()).getTime();
        break;
      }
      case '3min': {
        fr = moment().subtract(1, 'day');
        toe = moment();
        from = fr.format('DD-MM-YYYY');
        to = toe.format('DD-MM-YYYY');
        this.min = new Date(moment().subtract(1, 'day').toISOString()).getTime();
        break;
      }
      case '5min': {
        fr = moment().subtract(1, 'day');
        toe = moment();
        from = fr.format('DD-MM-YYYY');
        to = toe.format('DD-MM-YYYY');
        this.min = new Date(moment().subtract(1, 'day').toISOString()).getTime();
        break;
      }
      case '10min': {
        fr = moment().subtract(1, 'day');
        toe = moment();
        from = fr.format('DD-MM-YYYY');
        to = toe.format('DD-MM-YYYY');
        this.min = new Date(moment().subtract(1, 'day').toISOString()).getTime();
        break;
      }
      case '15min': {
        fr = moment().subtract(1, 'day');
        toe = moment();
        from = fr.format('DD-MM-YYYY');
        to = toe.format('DD-MM-YYYY');
        this.min = new Date(moment().subtract(1, 'day').toISOString()).getTime();
        break;
      }
      case '30min': {
        fr = moment().subtract(1, 'day');
        toe = moment();
        from = fr.format('DD-MM-YYYY');
        to = toe.format('DD-MM-YYYY');
        this.min = new Date(moment().subtract(2, 'day').toISOString()).getTime();
        break;
      }
      case 'hour': {
        fr = moment().subtract(7, 'day');
        toe = moment();
        from = fr.format('DD-MM-YYYY');
        to = toe.format('DD-MM-YYYY');
        this.min = new Date(moment().subtract(2, 'day').toISOString()).getTime();
        break;
      }
      case 'day': {
        fr = moment().subtract(365, 'day');
        toe = moment();
        from = fr.format('DD-MM-YYYY');
        to = toe.format('DD-MM-YYYY');
        this.min = new Date(moment().subtract(40, 'day').toISOString()).getTime();
        break;
      }
      case 'week': {
        fr = moment().subtract(720, 'day');
        toe = moment();
        from = fr.format('DD-MM-YYYY');
        to = toe.format('DD-MM-YYYY');
        this.min = new Date(moment().subtract(6, 'month').toISOString()).getTime();
        break;
      }
      case 'month': {
        fr = moment().subtract(36, 'month');
        toe = moment();
        from = fr.format('DD-MM-YYYY');
        to = toe.format('DD-MM-YYYY');
        this.min = new Date(moment().subtract(10, 'month').toISOString()).getTime();
        break;
      }
    }

    const res = await this.portfolioService.getCandleFigiPeriod(this.figi, from, to, this.interval);
    if (res) {
      const result = this.reformatCandles(res.candles);

      this.chartCandleOptions = {
        series: [
          {
            name: `${this.info.name}`,
            data: result.data,
          },
        ],
        title: {
          text: this.info.name,
          align: 'left',
        },

        stroke: {
          curve: 'smooth',
          width: 2,
        },

        chart: {
          type: this.chartType,

          height: 250,
          id: 'candles',
          stacked: false,
          toolbar: {
            show: true,
            offsetX: 0,
            offsetY: 0,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: false,
              reset: false,
            },
          },

          events: {
            updated: (event) => {
              // console.log(event);
            },
          },
        },

        plotOptions: {

          candlestick: {
            colors: {
              upward: '#379903',
              downward: '#e9032d',
            },
          },
        },
        yaxis: {
          // forceNiceScale: true,
          floating: false,
          // axisTicks: {
          //   show: true,
          // },
          showForNullSeries: false,
          // logarithmic: true,
          tooltip: {
            enabled: true,
          },
          opposite: true,
          labels: {
            show: true,
            align: 'right',
          },
        },
        xaxis: {
          type: 'datetime',
          tickAmount: 10,
          labels: {
            formatter: (val) => {
              switch (this.interval) {
                case '1min':
                  return moment(val).format('hh:mm');
                case '2min':
                  return moment(val).format('hh:mm');
                case '3min':
                  return moment(val).format('hh:mm');
                case '5min':
                  return moment(val).format('hh:mm');
                case '10min':
                  return moment(val).format('hh:mm');
                case '15min':
                  return moment(val).format('hh:mm');
                case '30min':
                  return moment(val).format('hh:mm');
                case 'hour':
                  return moment(val).format('hh:mm');
                case 'day':
                  return moment(val).format('DD.MM.YY');
                case 'week':
                  return moment(val).format('DD.MM.YY');
                case 'month':
                  return moment(val).format('DD.MM.YY');
              }
              return moment(val).format('DD.MM.YY');
            },
          },
        },


        tooltip: {
          enabled: true,
        },
      };

      this.chartBarOptions = {
        series: [
          {
            name: 'volume',
            data: result.val,
          },
        ],
        chart: {
          height: 150,
          type: 'bar',
          brush: {
            enabled: true,
            target: 'candles',
          },
          selection: {
            enabled: true,
            xaxis: {
              // этот параметр показывает сколько дней захватить в отображении
              min: this.min,
              max: new Date(toe.toISOString()).getTime(),
            },
            fill: {
              color: '#ccc',
              opacity: 0.4,
            },
            stroke: {
              color: '#0D47A1',
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        title: {
          text: 'Объем торгов',
          align: 'left',
        },
        plotOptions: {
          bar: {
            columnWidth: '80%',
            colors: {
              ranges: [
                {
                  from: -1000,
                  to: 0,
                  color: '#eab616',
                },
                {
                  from: 1,
                  to: 10000,
                  color: '#04c4e1',
                },
              ],
            },
          },
        },
        stroke: {
          width: 0,
        },
        xaxis: {
          type: 'datetime',
          axisBorder: {
            offsetX: 13,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
      };
    }
    this.sidenavService.showSpiner.next(false);
  }

  reformatCandles(candles: Array<CandleInterfase>) {
    const data = [];
    const val = [];
    this.price = candles[ candles.length - 1 ].c;
    const last = { payload: candles[ candles.length - 1 ] };
    this.socketService.eventSocketUpdate.next(last);
    for (const item of candles) {
      // const date = new Date(+moment(item.time).format('YYYY'), +moment(item.time).format('M'), +moment(item.time).format('DD'));
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
        inPortfolio: !!this.currentInstrument
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
