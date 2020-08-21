import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { languages } from './languages';


@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  langSubject$ = new Subject<string>();

  private supportLanguages = Array.from(languages);
  private language: string;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
  ) {
    const storage = JSON.parse(localStorage.getItem('iikoWeb_language'));
    const language = (storage) ? storage : this.locale;
    this.setLanguage(language);
  }

  setLanguage(value: any): void {
    if (!value) {
      value = 'ru-RU';
    }
    this.language = value;
    localStorage.setItem('iikoWeb_language', JSON.stringify(this.getLanguage5().replace('-', '_')));
    this.langSubject$.next(value);
  }

  getLanguage(): string {
    return this.language;
  }

  getLanguage5(): string {
    switch (this.language) {
      case 'ru_RU': return 'ru-RU';
      case 'en_US': return 'en-US';
      case 'en_GB': return 'en-GB';
      case 'ru-RU': return 'ru-RU';
      case 'en-US': return 'en-US';
      case 'en-GB': return 'en-GB';
      default: return 'ru-RU';
    }

  }

  getSupportLanguages(): Array<string> {
    return this.supportLanguages;
  }
}
