import { Injectable } from '@angular/core';
import {FatherService} from './father.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService extends FatherService{

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }


  async getStock(): Promise<any> {
    const res: any = await this.get('/api/instrument-list');
    return res.instruments;
  }
}
