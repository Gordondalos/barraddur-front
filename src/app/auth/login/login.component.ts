import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
  }

  /**
   * On init
   */
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
      this.router.navigateByUrl('/news');
    } else {
      this.router.navigateByUrl('/news');
    }

  }
}
