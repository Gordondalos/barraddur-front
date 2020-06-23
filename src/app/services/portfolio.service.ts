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

  async checkApi(): Promise<any> {
    const data = await this.get('/api');
    return data;
  }

  // По умолчанию обновит все на 30 дней
  async updateData(countDay = 30): Promise<any> {
    const data = await this.post('/api/historyByAllTicker', { countDay });
    return data;
  }

}
