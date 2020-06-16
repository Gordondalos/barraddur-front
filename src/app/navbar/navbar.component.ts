import { Component } from '@angular/core';
import { SidenavService } from '../services/sidenav.service';
import { animateText, onSideNavChange } from '../animations/animations';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [onSideNavChange, animateText]
})
export class NavbarComponent {
  public sideNavState: boolean = false;
  public linkText: boolean = false;

  constructor(private sidenavService: SidenavService) {
  }

  onSidenavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this.sidenavService.sideNavState$.next(this.sideNavState);
  }

}
