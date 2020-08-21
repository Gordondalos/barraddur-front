import { Component, OnDestroy, OnInit } from '@angular/core';
import { SidenavService } from './services/sidenav.service';
import { onMainContentChange } from './animations/animations';
import { PortfolioService } from './services/portfolio.service';
import { LocalstorageService } from './services/localstorage.service';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [onMainContentChange],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'tinkoff-front';
  onSideNavChange: boolean;
  isWelcome = false;
  userName = '';

  private unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private sidenavService: SidenavService,
    public portfolioService: PortfolioService,
    public localstorageService: LocalstorageService,
    public router: Router,
  ) {
    this.sidenavService.sideNavState$.subscribe(res => {
      this.onSideNavChange = res;
    });

    // this.welcome();

    this.router.events
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.isWelcome = window.location.hash === '#/auth/login';
          this.getUserName();
        }
      });

  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }


  getUserName() {
    const userName: any = this.localstorageService.get('user');
    if (userName && userName.name) {
      this.userName = userName.name;
    } else {
      setTimeout(() => {
        this.getUserName();
      }, 100);
    }

  }


  async ngOnInit() {
    const data = await this.portfolioService.checkApi();
    this.localstorageService.set('api', data);
  }
}
