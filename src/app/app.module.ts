import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HeaderModule } from './header/header.module';
import { NavbarModule } from './navbar/navbar.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonComponentModule } from './auth/error-dialog/common-component.module';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthInterceptor } from './auth/auth.interceptor';
import { LockScreenModule } from './auth/lock-screen/lock-screen.module';


import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { PortfolioModule } from './portfolio/portfolio.module';

const config: SocketIoConfig = { url: 'http://localhost:5000', options: {} };


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HeaderModule,
    NavbarModule,
    MatSidenavModule,
    MatNativeDateModule,
    CommonComponentModule,
    MatDialogModule,
    LockScreenModule,
    SocketIoModule.forRoot(config),
    PortfolioModule,
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
