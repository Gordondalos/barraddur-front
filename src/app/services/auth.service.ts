import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ErrorService } from './error.service';
import { Auth } from '../interfaces/auth.model';
import { User } from '../interfaces/user.model';
import { Subject } from 'rxjs';

import { Router } from '@angular/router';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userChange = new Subject();

  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private router: Router,
    private localstorageService: LocalstorageService,
  ) {

  }

  async getAuthData(): Promise<Auth> {

    // Переписать на получение пользователя по барертокену с бекенда, при первичной авторизации,
    // пользователю должен присваиваться барер токен и при каждом обращении время жизни барер токена должно продлеваться
    return new Promise((resolve) => {
      const user = this.localstorageService.get('user');
      if (user) {
        resolve({ authorized: true });
      } else {
        resolve({ authorized: false });
      }
    });

    // const response: any = await this.http.get<Response>('/api/auth').toPromise();
    // if (response && response.user) {
    //   return this.getAuth(response);
    // } else {
    //   window.location.href = '/#/login';
    // }

  }

  getAuth(data): Auth | boolean {
    if (data && data.user) {
      const user = new User(data.user.id, data.user.login, data.user.name, data.user.mainRoleCode);
      this.userChange.next(data.user);
      return new Auth(data.appversion, data.authorized, data.domain, data.store, data.storeId, user);
    }
    return false;


  }

  async tryLogin(authData: any): Promise<Auth | boolean> {
    const headers = new HttpHeaders();
    headers[ 'disableCache' ] = 'true';
    const url = `/api/auth/login`;
    return this.http.post(url, authData, { headers }).toPromise()
      .then((response: any) => {
        if (response.error) {
          const errorObj = { errorMessage: response.message };
          this.errorService.showErrorMessage(errorObj);
        }

        this.localstorageService.set('user', response.user);
        this.localstorageService.set('token', response.token);
        this.localstorageService.set('filialId', response.filialId);
        return this.getAuth(response);
      })
      .catch((response) => {
        return false;
      });
  }

  async logOut(): Promise<any> {
    // const response = await this.http.get<Response>('/api/auth/logout').toPromise();
    localStorage.clear();
    // this.router.navigateByUrl('/');
    window.location.href = '/#/auth/login';
  }

  async registration(data): Promise<boolean> {
    const url = `/api/auth/registration`;
    const res: any = await this.http.post(url, data).toPromise();
    if (res) {
      return res.data;
    } else {
      return false;
    }
  }
}
