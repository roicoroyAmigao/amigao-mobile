import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { IonStorageService } from '../services/ionstorage.service';
import { StrapiAuthService } from '../services/strapi.auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: StrapiAuthService,
    private router: Router,
    private iosStorage: IonStorageService,
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkAuthState();
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.checkAuthState();
  }

  checkAuthState(): Observable<boolean> {
    return this.iosStorage.getKeyAsObservable('token')
      .pipe(
        take(1),
        map((auth) => !!auth),
        tap(loggedIn => {
          console.log(loggedIn);
          if (!loggedIn) {
            return this.router.navigateByUrl('/login');
          }
          // if (loggedIn) {
          //   return this.router.navigateByUrl('/home');
          // }
        })
      );
    // const authState = this.authService.isAuthenticated;
    // console.log(authState);

    // if (!authState) {
    //   this.router.navigateByUrl(this.authService.LoginUrl);
    //   return false;
    // }

    // return true;
  }
}
