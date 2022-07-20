/* eslint-disable @typescript-eslint/member-ordering */
import { HttpClient, HttpHeaders, HttpBackend, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { Token } from '@stripe/stripe-js';
import { environment } from 'src/environments/environment';
import { lastValueFrom } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { IonStorageService } from './shared/services/ionstorage.service';
import { IUser } from './shared/types/models/User';
import { IReqAuthRegister } from './shared/types/requests/ReqAuthRegister';
import { IReqPasswordReset } from './shared/types/requests/ReqPasswordReset';
import { IReqUserUpdate } from './shared/types/requests/ReqUserUpdate';
import { IResPasswordReset } from './shared/types/requests/ResPasswordReset';
import { IResRequestPasswordReset } from './shared/types/requests/ResRequestPasswordReset';
import { IResAuthLogin } from './shared/types/responses/ResAuthLogin';
import { IResAuthRegister } from './shared/types/responses/ResAuthRegister';
import { StrapiAuthConfig, StrapiAuthProviders } from './shared/types/StrapiAuthConfig';
import { NavigationService } from './checkout/shared/services/navigation.service';

@Injectable({
  providedIn: 'root'
})
export class StrapiService {
  private apiUrl: string;
  private user: IUser;
  private token: string;
  private authHttpClient: HttpClient;

  public readonly strapiAuthConfig: StrapiAuthConfig;
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private httpClient: HttpClient,
    private iosStorage: IonStorageService,
    private store: Store,
    private navigation: NavigationService,
  ) {
  }

  public async login(email: string, password: string): Promise<void> {
    const res: IResAuthLogin | HttpErrorResponse = await this.postLogin(
      email,
      password
    );

    if (res) {
      this.setTokenResponse(res as IResAuthLogin);
    }
  }

  /**
   * Register new user with given data
   *
   * If registration has jwt token and user data in response
   * then store token and show user as logged in
   *
   */
  public async register(
    email: string,
    username: string,
    password: string
  ): Promise<void> {
    const req: IReqAuthRegister = {
      username,
      email,
      password
    };

    const res: IResAuthRegister | HttpErrorResponse = await this.postRegister(
      req
    );

    if (res) {
      this.setTokenResponse(res as IResAuthRegister);
    }
  }

  /**
   * Logout user
   */
  public async logout(): Promise<void> {
    this.user = null;
    this.iosStorage.storageRemove('token');
    this.iosStorage.storageRemove('user');
    this.navigation.navigatebackParams('login');
  }

  /**
   * Login user and request token
   */
  private async postLogin(
    identifier: string,
    password: string
  ): Promise<IResAuthLogin | HttpErrorResponse> {
    try {
      const res: IResAuthLogin | HttpErrorResponse = (await lastValueFrom(
        this.httpClient.post(environment.API_BASE_PATH + '/api/auth/local', {
          identifier,
          password
        }, { headers: this.headers })
      )) as IResAuthLogin;
      // this.store.dispatch(new UserActions.Set(res));
      return res;
    } catch (error) {
      throw new HttpErrorResponse(error);
    }
  }

  // async postAxios(registerReq: IReqAuthRegister): Promise<IResAuthRegister | HttpErrorResponse> {
  //   console.log(axios);
  //   try {
  //     const res: IResAuthRegister | HttpErrorResponse = await axios
  //       .post(environment.API_BASE_PATH + '/api/auth/local/register', {
  //         username: 'Strapi user1',
  //         email: 'user1@strapi.io',
  //         password: 'strapiPassword',
  //       });
  //     // .then((response) => {
  //     //   // Handle success.
  //     //   console.log('Well done!');
  //     //   console.log('User profile', response.data.user);
  //     //   console.log('User token', response.data.jwt);
  //     // })
  //     // .catch((error) => {
  //     //   // Handle error.
  //     //   console.log('An error occurred:', error.response);
  //     // });
  //     return res;
  //   } catch (error) {
  //     throw new HttpErrorResponse(error);
  //   }

  // }
  private async postRegister(
    registerReq: IReqAuthRegister
  ): Promise<IResAuthRegister | HttpErrorResponse> {
    try {
      const res: IResAuthRegister | HttpErrorResponse = (await lastValueFrom(
        this.authHttpClient.post(environment.API_BASE_PATH + '/api/auth/local/register', {
          username: registerReq.username,
          email: registerReq.email,
          password: registerReq.password,
          // job: 'developer'
        }, { headers: this.headers })
      )) as IResAuthRegister;
      // this.store.dispatch(new UserActions.Set(res));
      return res;
    } catch (error) {
      throw new HttpErrorResponse(error);
    }
  }

  private setTokenResponse(res: IResAuthRegister | IResAuthLogin): void {
    if (res.jwt && res.user) {
      this.token = res.jwt;
      this.user = res.user as IUser;
      this.iosStorage.storageSet('token', this.token);
      this.iosStorage.storageSet('user', res);
    }
  }
  isLoggedIn() {
    this.iosStorage.getKeyAsObservable('user').subscribe((user) => {
      if (user) {
        return true;
      }
      else {
        return false;
      }
    });
  }
  public async updateProfile(updateReq: IReqUserUpdate): Promise<void> {
    const res: IUser | HttpErrorResponse = await this.updateUser(updateReq);
    if (res) {
      this.user = res as IUser;
    }
  }

  public async requestPasswordReset(email: string): Promise<void> {
    const res: IResRequestPasswordReset | HttpErrorResponse =
      await this.postRequestPasswordReset(email);
  }

  /**
   * Reset user password
   */
  public async resetPassword(
    passwordResetReq: IReqPasswordReset
  ): Promise<void> {
    const res: IResPasswordReset | HttpErrorResponse =
      await this.postResetPassword(passwordResetReq);
  }
  /**
   * Load own user obj
   */
  public async loadUser(): Promise<void> {
    this.requestUser().then((user) => {
      if (user) {
        this.user = user as IUser;
        console.log(user);
        return user;
      }
    });
  }

  async requestUser(): Promise<IUser | HttpErrorResponse> {
    try {
      const res: IUser | HttpErrorResponse = (await lastValueFrom(
        this.httpClient.get(environment.BASE_PATH + '/api/users/me', { headers: this.headers })
      )) as IUser | HttpErrorResponse;

      return res;
    } catch (error) {
      throw new HttpErrorResponse(error);
    }
  }

  private async updateUser(updateReq: IReqUserUpdate): Promise<IUser | HttpErrorResponse> {
    try {
      console.log(updateReq);
      const data = {
        data: {
          oldPassword: updateReq.oldPassword,
          password: updateReq.password,
          username: updateReq.username,
        },
      };
      const res: IUser | HttpErrorResponse = (await lastValueFrom(
        this.httpClient.put(environment.API_BASE_PATH + `/users/me`, data.data, { headers: this.headers })
      )) as IUser | HttpErrorResponse;
      console.log(res);
      return res;
    } catch (error) {
      throw new HttpErrorResponse(error);
    }
  }

  private async postRequestPasswordReset(
    email: string
  ): Promise<IResRequestPasswordReset | HttpErrorResponse> {
    try {
      const res: IResRequestPasswordReset | HttpErrorResponse =
        (await lastValueFrom(
          this.httpClient.post(environment.BASE_PATH + '/api/api/auth/forgot-password', {
            email
          }, { headers: this.headers })
        )) as IResRequestPasswordReset | HttpErrorResponse;

      return res;
    } catch (error) {
      throw new HttpErrorResponse(error);
    }
  }

  /**
   * Reset password
   */
  private async postResetPassword(
    passwordResetReq: IReqPasswordReset
  ): Promise<IResPasswordReset | HttpErrorResponse> {
    try {
      const res: IResPasswordReset | HttpErrorResponse = (await lastValueFrom(
        this.httpClient.post(
          this.apiUrl + '/api/auth/reset-password',
          passwordResetReq, { headers: this.headers }
        )
      )) as IResPasswordReset | HttpErrorResponse;

      return res;
    } catch (error) {
      throw new HttpErrorResponse(error);
    }
  }

  private decodeToken(token: string): Token | void {
    try {
      return jwt_decode(token) as Token;
    } catch (error) {
      return;
    }
  }

  public async callbackProviderLogin(
    params?: string,
    provider?: StrapiAuthProviders
  ): Promise<void> {
    try {
      const res: IResAuthLogin | void = (await lastValueFrom(
        this.httpClient.get(
          this.apiUrl + '/api/auth/' + provider + '/callback?' + params
        )
      )) as IResAuthLogin | void;

      if (res) {
        this.setTokenResponse(res);
      }
    } catch (error) {
      console.error(error);
      return;
    }
  }
}
