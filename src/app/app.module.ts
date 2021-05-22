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
import { PortfolioModule } from './portfolio/portfolio.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DinamicLoaderModule } from './dinamic-loader/dinamic-loader.module';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HowGetTokenComponent } from './how-get-tocken/how-get-token.component';
import { MatButtonModule } from '@angular/material/button';
import { InstructionActivateProdComponent } from './instuction-activate-prod/instruction-activate-prod.component';


@NgModule({
  declarations: [
    AppComponent,
    HowGetTokenComponent,
    InstructionActivateProdComponent,
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
    PortfolioModule,
    ReactiveFormsModule,
    DinamicLoaderModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
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
