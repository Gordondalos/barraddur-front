import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FatherService } from './father.service';


@Injectable({
  providedIn: 'root',
})
export class GroupService extends FatherService {

  constructor(private http: HttpClient) {
    super(http);
  }

  async getData(type): Promise<any> {
    return await this.get(`/api/stocks?type=${type}`);
  }

  async saveGroup(data): Promise<any> {
    return await this.post('/api/group/create', data);
  }
}
