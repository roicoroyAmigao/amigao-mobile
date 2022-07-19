import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { StrapiAuthConfig } from 'src/app/shared/types/StrapiAuthConfig';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  showMessages: any = {
    error: true,
    success: true
  };

  errors: string[] = [];
  messages: string[] = [];
  submitted = false;
  rememberMe = false;

  authLoginReq = {
    email: 'test@test.com',
    password: 'Rwbento123!'
  };

  config = {
    passwordRequired: true,
    passwordMinLength: 6,
    passwordMaxLength: 60,
    emailRequired: true
  };

  constructor(
    protected authService: AuthService,
    protected cd: ChangeDetectorRef,
    protected router: Router,
    protected translate: TranslateService,
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void { }

  public login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.authService
      .login(this.authLoginReq.email, this.authLoginReq.password)
      .then(() => {
        this.submitted = false;
        this.router.navigateByUrl('welcome');
      })
      .catch((err: HttpErrorResponse) => {
        this.submitted = false;
        console.log(err);
      });
  }
  registerPage() {
    this.router.navigateByUrl('register');
  }
  resetPassPage() {
    this.router.navigateByUrl('reset-password');
  }
  requestPassPage() {
    this.router.navigateByUrl('request-password');
  }
}
