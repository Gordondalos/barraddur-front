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

  saveUser(user: User): void {
    this.post('update/user', user);
  }
}
