import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  themeSelect: string;

  constructor(public themeService: ThemeService) {
  }

  ngOnInit(): void {
  }

  changeThemeColor(theme) {
    this.themeService.applyTheme(theme);
  }
}
