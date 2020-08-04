import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeComponent } from './welcome/welcome.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MatListModule } from '@angular/material/list';
import { NewsListComponent } from './news-list/news-list.component';
import { NewsInfoComponent } from './news-info/news-info.component';
import { MatCardModule } from '@angular/material/card';

const routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: WelcomeComponent,
  }
];

@NgModule({
  declarations: [
    WelcomeComponent,
    ToolbarComponent,
    NewsListComponent,
    NewsInfoComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatCardModule,
  ],
  exports: [
    WelcomeComponent,
  ],
})
export class WelcomeModule {
}
