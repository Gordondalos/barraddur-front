import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions } from '../../interfaces/chart-options.interface';
import { ChartComponent } from 'ng-apexcharts';
import { PortfolioService } from '../../services/portfolio.service';
import { StatisticInterace } from '../../interfaces/statistic.interace';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss'],
})
export class RadarComponent implements OnInit {

  @ViewChild('chartRadar') chartRadar: ChartComponent;


  options: Partial<ChartOptions>;
  statistic: StatisticInterace;

  constructor(
    private portfolioService: PortfolioService,
  ) {
    this.portfolioService.statisticChange
      .subscribe((statistic: StatisticInterace) => {
        this.statistic = statistic;
        console.log(this.statistic);
      });

    this.options = {
      series: [{
        name: 'Series 1',
        data: [80, 50, 30, 40, 100],
      }],
      chart: {
        height: 350,
        type: 'radar',
        toolbar: {
          show: false,
        },
      },
      title: {
        text: 'Basic Radar Chart',
      },
      xaxis: {
        categories: ['Оценка', 'Будущий рост', 'Предыдущие результаты', 'Здоровье компании', 'Дивиденды'],
      },
    };

  }

  ngOnInit() {


  }


}
