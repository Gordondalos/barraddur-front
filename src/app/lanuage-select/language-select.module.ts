import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageSelectComponent } from './language-select/language-select.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FlexModule } from '@angular/flex-layout';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [LanguageSelectComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FormsModule,
    FlexModule,
    MatMenuModule,
  ],
  exports: [
    LanguageSelectComponent,
  ],
})
export class LanguageSelectModule { }
