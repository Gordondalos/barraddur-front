import { Component, Input, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-history-triling',
  templateUrl: './history-triling.component.html',
  styleUrls: ['./history-triling.component.scss'],
})
export class HistoryTrilingComponent implements OnInit {
  @Input() figi: string;
  history: any[];

  constructor(
    private portFolioService: PortfolioService,
  ) {
  }

  ngOnInit(): void {
    this.portFolioService.getHistoryTrailing(this.figi)
      .then((res) => {
        this.history = res;
        console.log('this.history', this.history);
      });
  }

}
