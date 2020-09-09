import {Component, OnInit} from '@angular/core';
import { SidenavService } from '../services/sidenav.service';
import { animateText, onSideNavChange } from '../animations/animations';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import {LocalstorageService} from '../services/localstorage.service';
import { User } from '../interfaces/user.model';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [onSideNavChange, animateText]
})
export class NavbarComponent implements OnInit{
  public sideNavState = false;
  public linkText = true;
  currentLink = '';
  links = [
    {id: 1, title: 'Скринер', routerLink: '/home', icon: 'home'},
    {id: 2, title: 'Портфель', routerLink: '/portfolio',  icon: 'person'},
    // {id: 3, title: 'Избранное', routerLink: '/favorites',  icon: 'star'},
    // {id: 4, title: 'Statistic', routerLink: '/statistics',  icon: 'insert_chart_outlined'},
    // {id: 5, title: 'Новости', routerLink: '/news', icon: 'rss_feed'}
  ];

  user: User;

  constructor(
    private sidenavService: SidenavService,
    public router: Router,
    public localstorageService: LocalstorageService
  ) {
    this.router.events //  событие роутера
      .pipe(
      filter(routeEvent => routeEvent instanceof NavigationEnd), // фильтрую события, если навигация
                                                                          // завершена присвоить класс NavigationEnd
    ).subscribe(() => { // подписываюсь на событие
      this.currentLink = router.url;
    });
  }

  ngOnInit() {
    this.sideNavState = this.localstorageService.get('sideNavState');
    this.user = this.localstorageService.get('user');
  }

  onSidenavToggle() {
    this.sideNavState = !this.sideNavState;
    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this.sidenavService.sideNavState$.next(this.sideNavState);
    this.localstorageService.set('sideNavState', this.sideNavState);
  }

}
