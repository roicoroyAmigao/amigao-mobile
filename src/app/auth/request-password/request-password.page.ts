import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/shop/shared/services/auth.service';
import { StrapiAuthConfig } from 'src/app/shop/shared/types/StrapiAuthConfig';

@Component({
  selector: 'app-request-password',
  templateUrl: './request-password.page.html',
  styleUrls: ['./request-password.page.scss'],
})
export class RequestPasswordPage implements OnInit, OnDestroy {
  redirectDelay = 0;
  showMessages: any = {
    error: true,
    success: true
  };

  resetCreateReq: any = {
    email: ''
  };

  submitted = false;
  errors: string[] = [];
  messages: string[] = [];

  config = {
    emailRequired: true
  };

  constructor(
    protected authService: AuthService,
    protected cd: ChangeDetectorRef,
    protected router: Router,
    protected translate: TranslateService,
  ) { }

  ngOnInit(): void { }

  ngOnDestroy(): void { }
  requestPass(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.authService
      .requestPasswordReset(this.resetCreateReq.email)
      .then(() => {
        this.submitted = false;
        this.resetCreateReq.email = '';
        this.router.navigateByUrl('request-password');
      })
      .catch((error: HttpErrorResponse) => {
        this.submitted = false;

        if (error.status === 400) {
          this.errors.push(
            this.translate.instant('errors.auth.request-password.email')
          );
        }
        if (error.status) {
          console.log(error);
          this.errors.push(error.error.error);
        }
        else {
          this.errors.push(
            this.translate.instant('errors.auth.request-password.undefined')
          );
        }
      });
  }

  loginPage() {
    this.router.navigateByUrl('login');
  }
}
