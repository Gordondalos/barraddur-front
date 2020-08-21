import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LockScreenComponent } from './lock-screen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FlexModule } from '@angular/flex-layout';

@NgModule({
  declarations: [LockScreenComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    FlexModule,
    FormsModule,
  ],
  exports: [LockScreenComponent],
  entryComponents: [LockScreenComponent],
})
export class LockScreenModule {
}
