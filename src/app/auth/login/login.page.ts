import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shop/shared/services/auth.service';
import { StrapiAuthConfig } from 'src/app/shop/shared/types/StrapiAuthConfig';

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
    // this.rememberMe = false;
  }

  ngOnDestroy(): void { }

  /**
   * Login for local registered users
   */
  public login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.authService
      .login(this.authLoginReq.email, this.authLoginReq.password)
      .then(() => {
        this.submitted = false;

        this.router.navigateByUrl('home');
        // console.log(this.authService.isAuthenticated);
        // if (this.authService.isAuthenticated) {
        //   this.router.navigateByUrl(this.authService.LoginRedirectUrl);
        // }
      })
      .catch((err: HttpErrorResponse) => {
        this.submitted = false;
        console.log(err);
        if (err.status === 400) {
          switch (err.error.data[0].messages[0].id) {
            case 'Auth.form.error.confirmed':
              this.errors.push(
                this.translate.instant('errors.auth.login.email_verification')
              );
              break;
            case 'Auth.form.error.blocked':
              this.errors.push(
                this.translate.instant('errors.auth.login.account_blocked')
              );
              break;

            default:
              this.errors.push(
                this.translate.instant('errors.auth.login.password_or_email')
              );
              break;
          }
        } else {
          this.errors.push(
            this.translate.instant('errors.auth.login.undefined')
          );
        }
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
