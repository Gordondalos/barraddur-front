import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ThemeService } from '../services/theme.service';
import { PortfolioService } from '../services/portfolio.service';
import { LocalstorageService } from '../services/localstorage.service';
import { AuthService } from '../auth/services/auth.service';
import { InstrumentInterface } from '../interfaces/instrumentInterface';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() sidenav: MatSidenav;
  themeSelect: string;
  showTitle = false;
  showBuy = false;

  currentInstrument: InstrumentInterface;
  isDetailInstrument: boolean;

  private unsubscribeAll: Subject<any> = new Subject<any>();
  search: string;
  showSearch = false;

  constructor(
    public themeService: ThemeService,
    private portfolioService: PortfolioService,
    private authService: AuthService,
    private localstorageService: LocalstorageService,
    private router: Router,
    private _location: Location,
  ) {

    this.router.events
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          if (this.router.url.indexOf('portfolio/detail') !== -1) {
            this.isDetailInstrument = true;
          } else {
            this.isDetailInstrument = false;
          }

          if (this.router.url.indexOf('portfolio/buy') !== -1) {
            this.showBuy = true;
          } else {
            this.showBuy = false;
          }

          this.search = '';

        }
      });

    this.portfolioService.instrumentEvent
      .subscribe((instrument: InstrumentInterface) => {
        this.currentInstrument = instrument;
        this.localstorageService.set('currentInstrument', this.currentInstrument);
      });


  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
  }


  ngAfterViewInit() {

  }

  async ngOnInit(): Promise<any> {

    this.currentInstrument = this.localstorageService.get('currentInstrument');
    // this.showTitle = window.innerWidth > 968;
    this.showTitle = true;
  }


  changeThemeColor(theme) {
    this.themeService.applyTheme(theme);
  }

  logout() {
    this.authService.logOut().then();
  }

  showSideBar() {
    console.log('тут выводим сайдбар');
  }

  goBack() {
    // this._location.back();
    this.router.navigateByUrl('/portfolio?open=portfolio');
  }


  searchChange(event: string) {
    this.portfolioService.searchEvent.next(event);
  }

  openStore() {
    this.router.navigateByUrl('/store/store');
  }
}
