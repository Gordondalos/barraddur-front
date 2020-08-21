import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.scss'],
})
export class LockScreenComponent implements OnInit {
  __SESSION_TTL = 'iikoWeb_sessionTtl';
  firstName = '';
  user: any;
  login = '';
  password = '';
  loginForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LockScreenComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  async ngOnInit(): Promise<void> {
    this.loginForm = this.formBuilder.group({
      login: [this.login],
      password: ['', Validators.required],
    });

    this.user = JSON.parse(localStorage.getItem('user'));
    this.login = this.user.login;
    if (!this.user.firstName || this.user.firstName === '') {
      this.firstName = this.login;
    } else {
      this.firstName = this.user.firstName;
    }
    this.changePosition();
    await this.authService.logOut();
  }

  changePosition(): void {
    this.dialogRef.updatePosition({ top: '50px' });
  }

  close(): void {
    this.dialogRef.close();
  }

  async tryLogin(): Promise<void> {
    const res = await this.authService.tryLogin({ login: this.login, password: this.loginForm.get('password').value });
    if (res) {
      this.dialogRef.close();
    }
    // localStorage.setItem( __SESSION_TTL, JSON.stringify( auth.info.sessionTtl ) );
  }
}
