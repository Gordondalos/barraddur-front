import { Component, OnInit } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { onMainContentChange } from './animations/animations';
import { PortfolioService } from './services/portfolio.service';
import { LocalstorageService } from './services/localstorage.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [onMainContentChange],
})
export class AppComponent implements OnInit {
  title = 'tinkoff-front';
  onSideNavChange: boolean;
  isWelcome = false;


  constructor(
    private sidenavService: SidenavService,
    public portfolioService: PortfolioService,
    public localstorageService: LocalstorageService,
    public router: Router,
  ) {
    this.sidenavService.sideNavState$.subscribe(res => {
      this.onSideNavChange = res;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.router.url.indexOf('welcome') !== -1) {
          this.isWelcome = true;
        }
      }
    });

  }

  async ngOnInit() {
    const data = await this.portfolioService.checkApi();
    this.localstorageService.set('api', data);
  }
}
