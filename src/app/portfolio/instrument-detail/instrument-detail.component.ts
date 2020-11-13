import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ChartComponent } from 'ng-apexcharts';
// import { ChartOptions } from '../../interfaces/chart-options.interface';
import { PortfolioService } from '../../services/portfolio.service';
import * as moment from 'moment';
import { CandleInterfase } from '../../interfaces/candle.interfase';
import { ChartOptions } from '../../interfaces/chart-options.interface';
import { InstrumentInfoInterface } from '../../interfaces/instrument-info.interface';


@Component({
  selector: 'app-instrument-detail',
  templateUrl: './instrument-detail.component.html',
  styleUrls: ['./instrument-detail.component.scss'],
})
export class InstrumentDetailComponent implements OnInit {

  @ViewChild('chart') chart: ChartComponent;
  public chartCandleOptions: Partial<ChartOptions>;
  public chartBarOptions: Partial<ChartOptions>;

  figi: string;
  info: InstrumentInfoInterface;

  constructor(
    public route: ActivatedRoute,
    private portfolioService: PortfolioService,
  ) {
    this.figi = route.snapshot.params.figi;
    console.log(this.figi);
  }

  ngOnInit(): void {
    this.init();

  }

  async init(): Promise<void> {

    this.info = await this.portfolioService.getInfoByFigi(this.figi);
    console.log(this.info);

    const fr = moment().subtract(185, 'day');
    const toe = moment();
    const from = fr.format('DD-MM-YYYY');
    const to = toe.format('DD-MM-YYYY');
    const res = await this.portfolioService.getCandleFigiPeriod(this.figi, from, to);
    console.log(res);
    if (res) {
      const result = this.reformatCandles(res.candles);

      this.chartCandleOptions = {
        series: [
          {
            name: 'candle',
            data: result.data,
          },
        ],
        title: {
          text: this.info.name,
          align: 'left',
        },

        chart: {
          type: 'candlestick',
          height: 250,
          id: 'candles',
          toolbar: {
            autoSelected: 'pan',
            show: false,
          },
          zoom: {
            enabled: true,
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

        xaxis: {
          type: 'datetime',
          labels: {
            formatter: (val) => {
              return moment(val).format('DD.MM.YY');
            },
          },
        },
        yaxis: {
          tooltip: {
            enabled: true,
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
              min: new Date(moment().subtract(40, 'day').toISOString()).getTime(),
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
  }

  reformatCandles(candles: Array<CandleInterfase>) {
    const data = [];
    const val = [];
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

}
