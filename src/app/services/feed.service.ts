import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { FatherService } from './father.service';


@Injectable({
  providedIn: 'root',
})
export class FeedService extends FatherService {

  openNewsEvent = new Subject();
  getFirstNews = new Subject();

  constructor(
    public httpClient: HttpClient,
  ) {
    super(httpClient);
  }

  async getById(id: number): Promise<any> {
    const url = `/api/news/${ id }`;
    return this.get(url)
      .then((res: any) => {
        if (res) {
          return res;
        }
      });
  }

  async getNews(from: string, to: string): Promise<any> {
    // const from = '2020-07-13';
    // const to = '2020-07-15';

    const url = `/api/news/${ from }/${ to }`;
    return this.get(url)
      .then((res: any) => {
        if (res) {
          return res;
        }
      });
  }
}
