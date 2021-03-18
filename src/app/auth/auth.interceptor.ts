import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { interval, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LockScreenComponent } from './lock-screen/lock-screen.component';
import { LanguageService } from '../lanuage-select/services/language.service';


@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {

  subscription: any = null;
  dialogRef: any = null;

  constructor(
    private router: Router,
    private languageService: LanguageService,
    public dialog: MatDialog,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request.headers[ 'Accept-language' ] = this.languageService.getLanguage();

    // const sessionTtl = +localStorage.getItem('iikoWeb_sessionTtl');
    let token = localStorage.getItem('token');
    if (!token) {
      token = 'start';
    }

    if (!token && window.location.hash !== '#/auth/login') {
      window.location.href = '/#/auth/login';
    }

    // if (sessionTtl && sessionTtl !== 0) {
    //   if (this.subscription !== null) {
    //     this.subscription.unsubscribe();
    //     this.subscription = null;
    //   }
    //   const timer = sessionTtl * 1000;
    //   const intv = interval(timer);
    //   this.subscription = intv.subscribe(n => this.showDialogAuth());
    // }

    const req = request.clone({
      setHeaders: {
        'Accept-Language': this.languageService.getLanguage5(),
        'token': token,
      },
    });

    return next.handle(req).pipe(catchError((error) => {
      this.handleAuthError(error);
      return of(error);
    }) as any);
  }

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   request.headers['Accept-language'] = this.languageService.getLanguage();
  //   return next.handle(request).pipe(catchError((error) => {
  //     this.handleAuthError(error);
  //     return of(error);
  //   }) as any);
  // }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401 || error.status === 403) {
      window.location.href = '/#/auth/login';
      return of(error.message);
    }
    throw error;
  }

  showDialogAuth(): void {
    if (this.dialogRef === null) {
      this.dialogRef = this.dialog.open(LockScreenComponent, {
        width: '300px',
        disableClose: true,
      });
      this.dialogRef.afterClosed().subscribe(x => {
        this.dialogRef = null;
      });
    }
  }
}
