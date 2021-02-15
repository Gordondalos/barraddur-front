import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuySellComponent } from './buy-sell/buy-sell.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FilterInstrumentsPipe } from './filter-instruments.pipe';


@NgModule({
  declarations: [BuySellComponent, FilterInstrumentsPipe],
    exports: [
        BuySellComponent,
        FilterInstrumentsPipe,
    ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
  ],
})
export class BuySellModule { }
