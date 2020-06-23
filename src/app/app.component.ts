import {Component, OnInit} from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { onMainContentChange } from './animations/animations';
import { PortfolioService } from './services/portfolio.service';
import {LocalstorageService} from './services/localstorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [onMainContentChange]
})
export class AppComponent implements OnInit{
  title = 'tinkoff-front';
  public onSideNavChange: boolean;

  constructor(
    private sidenavService: SidenavService,
    public portfolioService: PortfolioService,
    public localstorageService: LocalstorageService
    ) {
    this.sidenavService.sideNavState$.subscribe(res => {
      this.onSideNavChange = res;
    });
  }
  async ngOnInit() {
    const data = await this.portfolioService.checkApi();
    this.localstorageService.set('api', data);
  }
}
