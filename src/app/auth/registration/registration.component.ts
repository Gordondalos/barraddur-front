import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../login/login.component.scss'],
})
export class RegistrationComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
  }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async login() {
    const res: any = await this.authService.tryLogin({
      login: this.loginForm.get('userName').value,
      password: this.loginForm.get('password').value,
    });
    if (res && res.user) {
      this.authService.getAuth(res);
      this.router.navigateByUrl('/welcome/main');
    } else {
      this.router.navigateByUrl('/welcome/main');
    }

  }
}
