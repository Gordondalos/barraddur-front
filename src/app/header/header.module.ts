import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
  ],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        FormsModule,
        RouterModule,
    ],
  exports: [
    HeaderComponent,
  ]
})
export class HeaderModule { }
