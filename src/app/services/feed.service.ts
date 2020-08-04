import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class FeedService {

  openNewsEvent = new Subject();
  getFirstNews = new Subject();

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  async getById(id: number): Promise<any> {
    const url = `/api/news/${ id }`;
    return this.httpClient.get(url).toPromise()
      .then((res: any) => {
        if (res) {
          return res.data;
        }
      });
  }

  async getNews(from: string, to: string): Promise<any> {
    // const from = '2020-07-13';
    // const to = '2020-07-15';

    const url = `/api/news/${ from }/${ to }`;
    return this.httpClient.get(url).toPromise()
      .then((res: any) => {
        if (res) {
          return res.data;
        }
      });
  }
}
