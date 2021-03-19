import { Injectable } from '@angular/core';
import { FatherService } from './father.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { OperationsInterface } from '../interfaces/operations.interface';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService extends FatherService {

  updateBalanceEvent = new Subject();
  instrumentEvent = new Subject();
  portfolioUpdateEvent = new Subject();
  searchEvent = new Subject();

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  async getPortfolio(): Promise<any> {
    const data = await this.get('/api/portfolio');
    if (data) {
      return data.positions;
    }
    return [];
  }

  async instrumentPortfolio(params): Promise<any> {
    const res = await this.post('/api/instrumentPortfolio', {figi: params.figi});
    if (res) {
      return res;
    }
    return {};
  }

  async getInstrumentOperations(params: { figi: string, from?: string, to?: string }): Promise<OperationsInterface | any> {
    // from и  to должны быть в формате 'DD-MM-YYYY'
    const res = await this.post('/api/instrumentOperations', { figi: params.figi, from: params.from, to: params.to });
    if (res) {
      return res.operations;
    }
    return [];
  }

  async getLastCandlesByPeriod(params: { figi: string, from?: string, to?: string , interval?: string}){
    const res = await this.post('/api/market/candles', {
      figi: params.figi,
      from: params.from ? params.from : moment().subtract(1, 'day').toISOString(),
      to: params.to ? params.to : moment().toISOString(),
      interval: params.interval ? params.interval : '1min',
    });
    if (res) {
      return res.candles;
    }
    return [];
  }

  async getHistoryTrailing(figi): Promise<any> {
    const data = await this.get(`/api/getHistoryTrailing/${ figi }`);
    if (data) {
      return data;
    }
    return [];
  }

  async getBalance(): Promise<any> {
    const data: any = await this.get('/api/portfolioCurrencies');
    return data ? data.currencies : '';
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

  async getCandleFigiPeriod(figi, from, to, interval): Promise<any> {
    const data = await this.get(`/api/get-candle-by-period/${ figi }/${ from }/${ to }/${ interval }`);
    return data;
  }

  async getInfoByFigi(figi): Promise<any> {
    const data = await this.get(`/api/get-info-by-figi/${ figi }`);
    return data;
  }


}
