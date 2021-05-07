import { Injectable } from '@angular/core';
import { FatherService } from './father.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../interfaces/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService extends FatherService {

  constructor(public httpClient: HttpClient) {
    super(httpClient);
  }

  changeMode(mode) {
    this.post('/api/update/mode', { mode });
  }

  saveUser(user: User): Promise<any> {
    return this.post('/api/update/user', { data: user });
  }

  async addSumToSandbox(sum, currency) {
    return await this.post('/api/add-sum-sandbox', { sum, currency });
  }
}
