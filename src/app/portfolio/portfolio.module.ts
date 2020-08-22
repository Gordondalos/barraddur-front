import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioComponent } from './portfolio.component';
import { RouterModule, Routes } from '@angular/router';
import { InstrumentsComponent } from './instruments/instruments.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { AgGridModule } from 'ag-grid-angular';
import { MatButtonModule } from '@angular/material/button';
import { GroupKreatorComponent } from './group-kreator/group-kreator.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { BuySellModule } from '../buy-sell/buy-sell.module';

const routes: Routes = [
  {
    path: '',
    component: PortfolioComponent
  }
];

@NgModule({
  declarations: [
    PortfolioComponent,
    InstrumentsComponent,
    GroupKreatorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    AgGridModule.withComponents([]),
    MatButtonModule,
    MatAutocompleteModule,
    FormsModule,
    MatIconModule,
    BuySellModule,
  ],
  exports: [
    PortfolioComponent,
  ]
})
export class PortfolioModule { }
