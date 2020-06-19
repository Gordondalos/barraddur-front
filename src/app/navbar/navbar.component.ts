import { Component } from '@angular/core';
import { SidenavService } from '../services/sidenav.service';
import { animateText, onSideNavChange } from '../animations/animations';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [onSideNavChange, animateText]
})
export class NavbarComponent {
  public sideNavState: boolean = false;
  public linkText: boolean = false;
  currentLink = '';
  links = [
    {id: 1, title: 'Home', routerLink: '/home', icon: 'home'},
    {id: 2, title: 'Portfolio', routerLink: '/portfolio',  icon: 'sort'},
    {id: 3, title: 'Favorites', routerLink: '/favorites',  icon: 'star'},
    {id: 4, title: 'Statistic', routerLink: '/statistics',  icon: 'send'}
  ];
  constructor(
    private sidenavService: SidenavService,
    public router: Router,
  ) {
    this.router.events //  событие роутера
      .pipe(
      filter(routeEvent => routeEvent instanceof NavigationEnd), // фильтрую события, если навигация
                                                                          // завершена присвоить класс NavigationEnd
    ).subscribe(() => { // подписываюсь на событие
      this.currentLink = router.url;
    });
  }

  onSidenavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this.sidenavService.sideNavState$.next(this.sideNavState);
  }

}
