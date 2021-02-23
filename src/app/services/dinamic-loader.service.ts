import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DinamicLoaderService {

  loadComponent$  = new Subject<{component: any, data: any}>();
  showLoader  = new Subject<boolean>();

  constructor() { }
}
