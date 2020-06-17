import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  constructor(public themeService: ThemeService) {
  }
  ngOnInit(): void {
  }

  changeThemeColor() {
    this.themeService.applyDefaultTheme();
  }
}
