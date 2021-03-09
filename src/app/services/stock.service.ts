import { Injectable } from '@angular/core';
import { FatherService } from './father.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockService extends FatherService {

  updateInstrumentsList = new Subject();

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }


  async getStock(): Promise<any> {
    const res: any = await this.get('/api/instrument-list');
    return res.instruments;
  }

  async deal(data): Promise<any> {
    return this.post(`/api/buySell/${ data.instrument.ticker }`, data).then((res) => {
      this.updateInstrumentsList.next(true);
      return res;
    });
  }

  async trailingStart(data): Promise<any> {
    return this.post(`/api/trailing/${ data.instrument.ticker }`, data).then((res) => {
      this.updateInstrumentsList.next(true);
      return res;
    });
  }

}
