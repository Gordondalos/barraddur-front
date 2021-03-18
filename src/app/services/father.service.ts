import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FatherService {
  apiUrl = environment.API_REST_URL;
  apiPort = environment.API_REST_PORT;
  host = environment.production ? `${ this.apiUrl }:${ this.apiPort }` : '';

  constructor(
    public httpClient: HttpClient) {
  }

  get(url: string): Promise<any> {
    const address = `${ this.host }${ url }`;
    return this.httpClient.get(address, { observe: 'response' }).toPromise()
      .then((res: any) => {
        console.log(res.body);
        const token = res.headers.get('token');
        if (token) {
          localStorage.setItem('token', JSON.stringify(token));
        }
        if (res) {
          return res.body.data;
        }
        return false;
      })
      .catch((error) => {
        const token = error.headers.get('token');
        if (token) {
          localStorage.setItem('token', JSON.stringify(token));
        }

        console.log(error);
      });
  }


  post(url: string, data): Promise<any> {
    return this.httpClient.post(`${ this.host }${ url }`, data, { observe: 'response' }).toPromise()
      .then((res: any) => {
        const token = res.headers.get('token');
        if (token) {
          localStorage.setItem('token', JSON.stringify(token));
        }

        return res.body.data;
      })
      .catch((error) => {
        const token = error.headers.get('token');
        if (token) {
          localStorage.setItem('token', JSON.stringify(token));
        }

        console.log(error);
        return false;
      });
  }

}
