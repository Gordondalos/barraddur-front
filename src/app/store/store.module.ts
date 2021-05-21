import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store/store.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DescriptionComponent } from './description/description.component';
import { RouterModule } from '@angular/router';

const route = [
  {
    path: 'description',
    component: DescriptionComponent,
  },
  {
    path: 'store',
    component: StoreComponent,
  },
];

@NgModule({
  declarations: [
    StoreComponent,
    DescriptionComponent,
  ],
  exports: [
    StoreComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild(route),
  ],
})
export class StoreModule {
}
