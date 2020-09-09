import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailInfoComponent } from './detail-info/detail-info.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: DetailInfoComponent,
  },
];

@NgModule({
  declarations: [DetailInfoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
})
export class DetailInfoModule {
}
