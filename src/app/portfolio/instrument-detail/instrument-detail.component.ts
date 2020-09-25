import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexPlotOptions,
  ApexDataLabels,
  ApexStroke,
} from 'ng-apexcharts';

import { seriesData, seriesDataLinear } from './ohlc';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
};

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

  constructor(
    public route: ActivatedRoute,
  ) {
    this.figi = route.snapshot.params.figi;
    console.log(this.figi);
  }

  ngOnInit(): void {

    this.chartCandleOptions = {
      series: [
        {
          name: 'candle',
          data: seriesData,
        },
      ],
      chart: {
        type: 'candlestick',
        height: 290,
        id: 'candles',
        toolbar: {
          autoSelected: 'pan',
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      plotOptions: {
        candlestick: {
          colors: {
            upward: '#3C90EB',
            downward: '#DF7D46',
          },
        },
      },
      xaxis: {
        type: 'datetime',
      },
    };

    this.chartBarOptions = {
      series: [
        {
          name: 'volume',
          data: seriesDataLinear,
        },
      ],
      chart: {
        height: 160,
        type: 'bar',
        brush: {
          enabled: true,
          target: 'candles',
        },
        selection: {
          enabled: true,
          xaxis: {
            min: new Date('20 Jan 2017').getTime(),
            max: new Date('10 Dec 2017').getTime(),
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
      plotOptions: {
        bar: {
          columnWidth: '80%',
          colors: {
            ranges: [
              {
                from: -1000,
                to: 0,
                color: '#F15B46',
              },
              {
                from: 1,
                to: 10000,
                color: '#FEB019',
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
