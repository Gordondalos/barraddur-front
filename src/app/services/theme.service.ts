import { Injectable } from '@angular/core';
import { Theme, light, dark } from '../styles/theme-default';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  styleTag: any;

  constructor() {
    this.createStyle();
    this.applyTheme('light');
  }


  applyTheme(themeName: string) {
    this.injectStylesheet(themeName);
  }


  private createStyle() {
    const head = document.head || document.getElementsByTagName('head')[ 0 ];
    this.styleTag = document.createElement('style');
    this.styleTag.type = 'text/css';
    this.styleTag.id = 'theme';
    head.appendChild(this.styleTag);
  }

  injectStylesheet(themeName: string) {
    let styles = ':root {';
    let th: Theme;
    switch (themeName) {
      case 'dark': th = dark; break;
      case 'light': th = light; break;
    }

    _.each(th.properties, (color, index) => {
      styles += `${index}: ${color};`;
    });
    styles += '}';
    this.styleTag.innerHTML = styles;
  }


}
