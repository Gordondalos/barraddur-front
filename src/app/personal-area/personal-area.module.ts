import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalAreaComponent } from './personal-area/personal-area.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: PersonalAreaComponent,
  },
];


@NgModule({
  declarations: [PersonalAreaComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatIconModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    PersonalAreaComponent,
  ],
})
export class PersonalAreaModule {
}
