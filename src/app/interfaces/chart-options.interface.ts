import { ApexAxisChartSeries, ApexChart, ApexDataLabels,
  ApexPlotOptions, ApexStroke, ApexXAxis, ApexYAxis, ApexTitleSubtitle, ApexTooltip } from 'ng-apexcharts';

export interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
}
