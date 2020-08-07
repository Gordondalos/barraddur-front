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
    console.log(this.host, this.host);
    return this.httpClient.get(`${this.host}${url}`).toPromise()
      .then((res: any) => {
        return res.data;
      })
      .catch((error) => {
        alert(error.message);
      });
  }


  post(url: string, data): Promise<any> {
    console.log(this.host, this.host);
    return this.httpClient.post(`${this.host}${url}`, data).toPromise()
      .then((res: any) => {
        return res.data;
      })
      .catch((error) => {
        alert(error.error ? error.error.message : error.message);
        return false;
      });
  }

}
