import {Injectable} from '@angular/core';
import {Theme, light, dark} from '../styles/theme-default';

// const defaultTheme = require('../styles/theme-default.ts');
// const lightTheme = require('../styles/theme-light.scss');
// const darkTheme = require('../styles/theme-dark.scss');
// import * as defaultTheme from '../styles/theme-default';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  styleTag: any;

  constructor() {
    this.createStyle();
  }


  applyDefaultTheme() {
    this.injectStylesheet(light);
  }

  applyLightTheme() {
    this.injectStylesheet(dark);
  }

  // applyDarkTheme() {
  //   this.injectStylesheet(darkTheme);
  // }

  private createStyle() {
    const head = document.head || document.getElementsByTagName('head')[0];
    this.styleTag = document.createElement('style');
    this.styleTag.type = 'text/css';
    this.styleTag.id = 'theme';
    head.appendChild(this.styleTag);
  }

  injectStylesheet(theme: Theme) {
    this.styleTag.innerHTML = theme.properties;
  }
}
