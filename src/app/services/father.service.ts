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
    return this.httpClient.get(address).toPromise()
      .then((res: any) => {
        if (res) {
          return res.data;
        }
        return false;
      })
      .catch((error) => {
        console.log(error);
      });
  }


  post(url: string, data): Promise<any> {
    return this.httpClient.post(`${ this.host }${ url }`, data).toPromise()
      .then((res: any) => {
        return res.data;
      })
      .catch((error) => {
        alert(error.error ? error.error.message : error.message);
        return false;
      });
  }

}
