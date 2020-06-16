import { Component, OnInit } from '@angular/core';
import {SidenavService} from '../services/sidenav.service';
import {animateText, onSideNavChange} from '../animations/animations';

interface Page {
  link: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [onSideNavChange, animateText]
})
export class NavbarComponent implements OnInit {
  public page: Page;
  public sideNavState: boolean = false;
  public linkText: boolean = false;

  public pages: Page[] = [
    { name: 'Главная', link: 'some-link', icon: 'inbox' },
    { name: 'Портфель', link: 'some-link', icon: 'inbox' },
    { name: 'Избранное', link: 'some-link', icon: 'star' },
    { name: 'Статистика', link: 'some-link', icon: 'send' }
  ];

  constructor(private sidenavService: SidenavService) {}

  ngOnInit() {}

  onSidenavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this.sidenavService.sideNavState$.next(this.sideNavState);
  }

}
