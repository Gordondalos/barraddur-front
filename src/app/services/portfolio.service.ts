import { Injectable } from '@angular/core';
import { FatherService } from './father.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService extends FatherService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  async getPortfolio(): Promise<any> {
    const data = await this.get('/api/portfolio');
    return data.positions;
  }

  async getBalance(): Promise<any> {
    const data = await this.get('/api/portfolioCurrencies');
    return data.currencies;
  }

}
