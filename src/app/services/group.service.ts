import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  async getData(): Promise<any> {
    return await this.http.get('/api/stocks').toPromise();
  }
  async saveGroup(data): Promise<any> {
    return await this.http.post('/api/group/create', data).toPromise();
  }
}
