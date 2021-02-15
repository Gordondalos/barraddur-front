import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { GroupService } from '../../../services/group.service';
import { Stock } from '../../../interfaces/stock.interface';
import { InstrumentInterface } from '../../../interfaces/instrumentInterface';
import { Router } from '@angular/router';
import { PortfolioService } from '../../../services/portfolio.service';

@Component({
  selector: 'app-by-search',
  templateUrl: './by-search.component.html',
  styleUrls: ['./by-search.component.scss'],
})
export class BySearchComponent implements OnInit, AfterViewInit {
  @Input() type: string;
  @Input() label: string;
  instruments: InstrumentInterface[];


  constructor(
    private groupService: GroupService,
    private router: Router,
    private portfolioService: PortfolioService,
  ) {
  }

  ngOnInit(): void {
    this.init().then();
  }

  async init() {
    const res = await this.groupService.getData();
    this.instruments = res.result.instruments;
    console.log(this.instruments);
  }

  ngAfterViewInit() {

  }

  openDetail(item: InstrumentInterface) {
    this.router.navigateByUrl(`/portfolio/detail/${ item.figi }`);
    setTimeout(() => {
      this.portfolioService.instrumentEvent.next(item);
    }, 10);
  }

}
