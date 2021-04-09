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
import { environment } from '../environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { DinamicLoaderModule } from './dinamic-loader/dinamic-loader.module';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const config: SocketIoConfig = { url: environment.SOCKET_URL, options: { secure: true } };


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
    ReactiveFormsModule,
    DinamicLoaderModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
