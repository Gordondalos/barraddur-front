import { Component } from '@angular/core';
import { SidenavService } from '../services/sidenav.service';
import { animateText, onSideNavChange } from '../animations/animations';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';


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
    {id: 2, title: 'Portfolio', routerLink: '/portfolio',  icon: 'home'},
    {id: 3, title: 'Favorites', routerLink: '/favorites',  icon: 'home'},
    {id: 4, title: 'Statistic', routerLink: '/statistics',  icon: 'home'}
  ];
  constructor(
    private sidenavService: SidenavService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    this.router.events.pipe(
      filter(routeEvent => routeEvent instanceof NavigationEnd),

    ).subscribe(() => {
      this.currentLink = router.url;
      console.log(this.currentLink);
      console.log(router.url);
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
