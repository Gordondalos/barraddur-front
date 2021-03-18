import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PortfolioService } from '../services/portfolio.service';
import { InstrumentInterface } from '../interfaces/instrumentInterface';
import { GroupService } from '../services/group.service';
import { Stock } from '../interfaces/stock.interface';
import { SocketService } from '../services/socket.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SidenavService } from '../services/sidenav.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent implements OnInit, AfterViewInit {

  portfolio: Array<InstrumentInterface>;
  instruments: Stock[];

  balance: Array<{ currency: string, balance: number }>;

  instr: any;
  tabIndex = 0;

  constructor(
    public portfolioService: PortfolioService,
    private groupService: GroupService,
    private socketService: SocketService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sidenavService: SidenavService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const tab = this.activatedRoute.snapshot.queryParams.open;
        switch (tab) {
          case 'portfolio':
            this.openTab(0);
            break;
          case 'news':
            this.openTab(1);
            break;
          case 'chat':
            this.openTab(2);
            break;
          case 'person':
            this.openTab(3);
            break;
          default:
            this.openTab(0);
        }

      }
    });
  }

  ngAfterViewInit() {
  }

  async ngOnInit(): Promise<any> {

    setTimeout(() => {
      this.sidenavService.showSpiner.next(true);
    }, 10);

    const portfolio = await this.portfolioService.getPortfolio();
    if (portfolio && portfolio.length) {
      for (const item of portfolio) {
        item.id = item.figi;
      }
      this.portfolio = portfolio;
      this.balance = await this.portfolioService.getBalance();
      // const res = await this.groupService.getData();
      // this.instruments = res.result.instruments;
      await this.socketService.startSubscribtion(this.portfolio);
      // this.socketService.connect();
    } else {
      this.portfolio = [];
    }

    this.sidenavService.showSpiner.next(false);

  }

  openTab(tabIndex: number) {
    this.tabIndex = tabIndex;
  }

  setTabs(tabsName: string) {
    const queryParams = { open: tabsName };
    this.router.navigate(['.'], { relativeTo: this.activatedRoute, queryParams });
  }
}
