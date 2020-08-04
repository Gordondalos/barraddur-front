import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root',
})
export class CanActivateService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  async canActivate(): Promise<boolean> {
    let userAuth = false;
    const res = await this.authService.getAuthData();
    if (res && res.authorized) {
      userAuth = res.authorized;
    }

    const isActivate = userAuth;
    if (isActivate === false) {
      this.router.navigateByUrl('/auth/login');
    }

    return isActivate;
  }
}
