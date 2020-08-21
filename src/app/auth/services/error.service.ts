import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';


@Injectable({
  providedIn: 'root',
})
export class ErrorService {

  constructor(
    public dialog: MatDialog,
  ) {
  }

  showMessage(message: string): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '350px',
      data: message,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

  showErrorMessage(errorObj: any): void {
    console.log(errorObj);
    const messageArr = [];
    const list = errorObj && errorObj.error && typeof errorObj.error !== 'boolean' ? errorObj.error.errorList : errorObj.errorList;
    let message: string;
    if (!list) {
      message = errorObj.errorMessage ? errorObj.errorMessage : errorObj.error.errorMessage ? errorObj.error.errorMessage : '';
    } else {
      _.each(list, (error) => {
        messageArr.push(error.message);
      });
      message = messageArr.join(', ');
    }

    if (!message) {
      message = `Unknown error!`;
    }

    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '350px',
      data: message,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }
}
