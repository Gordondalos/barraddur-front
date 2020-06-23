import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {

  constructor() {
  }

  get(key: string): any {
    const res = localStorage.getItem(key);
    if (res) {
      return JSON.parse(res);
    }
  }

  set(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  remove(key): void {
    localStorage.removeItem(key);
  }
}
