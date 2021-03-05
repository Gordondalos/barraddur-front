import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  reg = false;
  visibility = false;
  type = 'password';
  checkedBtn = true;

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
      login: ['', Validators.required],
      name: [''],
      password: ['', Validators.required],
      tToken: [''],
      is_demo: [''],
    });
  }

  async login() {
    const res: any = await this.authService.tryLogin({
      login: this.loginForm.get('login').value,
      password: this.loginForm.get('password').value,
    });
    if (res && res.user) {
      this.authService.getAuth(res);
      this.router.navigateByUrl('/');
    } else {
      // this.router.navigateByUrl('/');
      alert('Авторизация не прошла!');
    }

  }

  showRegistration() {
    this.reg = !this.reg;
  }

  async registration() {

    const checkLogin = await this.authService.checkLogin(this.loginForm.get('login').value);
    if (!checkLogin) {
      const res: any = await this.authService.registration({
        login: this.loginForm.get('login').value,
        password: this.loginForm.get('password').value,
        name: this.loginForm.get('name').value,
        tToken: this.loginForm.get('tToken').value,
        is_demo: this.loginForm.get('is_demo').value ? 1 : 0,
      });
      if (res) {
        this.reg = false;
      } else {
        alert('что то пошло не так');
      }
    } else {
      alert('Пользователь с этой почтой уже зарегестрирован!');
    }


  }
}
