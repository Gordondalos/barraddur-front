import { Component, Input, OnInit } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { languagesFull } from '../services/languages';
import * as _ from 'lodash';

@Component({
  selector: 'iiko-language-select',
  templateUrl: './language-select.component.html',
  styleUrls: ['./language-select.component.scss'],
})
export class LanguageSelectComponent implements OnInit {
  @Input() baseHref;
  selectedLanguage: any;
  languages = languagesFull;

  constructor(private languageService: LanguageService) {
  }

  ngOnInit(): void {
    this.selectedLanguage = _.find(this.languages, (item) => {
      const id = this.languageService.getLanguage();
      return item.id === id.replace('-', '_');
    });

    if (!this.selectedLanguage) {
      this.selectedLanguage = {
        id: 'ru_RU',
        title: 'Русский (RU)',
        flag: 'ru_RU',
        shortTitle: 'RU',
        link: 'ru-RU',
      };

    }
  }

  setLanguage(lang): void {
    this.selectedLanguage = lang;
    this.languageService.setLanguage(lang.id);
    this.goToNeedLocation(lang);
  }

  goToNeedLocation(lang): void {
    const path = lang.link;
    debugger
    window.location.href = `${ location.origin }${ this.baseHref }/${ path }/index.html${ location.hash }`;
  }

}
