import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorDialogComponent } from './error-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ErrorDialogComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  providers: [

  ],
  exports: [ErrorDialogComponent],
  entryComponents: [ErrorDialogComponent],
})

export class CommonComponentModule {}
