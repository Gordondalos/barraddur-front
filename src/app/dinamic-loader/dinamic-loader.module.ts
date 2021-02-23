import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdDirective } from './ad.directive';
import { DinamicLoaderComponent } from './dinamic-loader.component';



@NgModule({
    declarations: [AdDirective, DinamicLoaderComponent],
  exports: [
    AdDirective,
    DinamicLoaderComponent,
  ],
    imports: [
        CommonModule,
    ],
})
export class DinamicLoaderModule { }
