/* eslint-disable @typescript-eslint/naming-convention */
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { IonStorageService } from '../services/ionstorage.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';




@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    tokenObservable;
    message: any = 'error message';
    constructor(
        private storage: IonStorageService,
        public toastController: ToastController,
        private router: Router
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        if (request.url.indexOf(environment.MEDUSA_API_BASE_PATH) === 0 || request.url.indexOf(environment.MEDUSA_API_BASE_PATH) === 0) {
            return this.storage.getKeyAsObservable('token').pipe(
                mergeMap(() => {
                    const clonedReq = this.medusaRequest(request);
                    return next.handle(clonedReq);
                }),
                catchError((response: HttpErrorResponse) => throwError(response))
            );
        } else {
            if (this.storage.getKeyAsObservable('token')) {
                return this.storage.getKeyAsObservable('token').pipe(
                    mergeMap(token => {
                        const clonedReq = this.addToken(request, token);
                        return next.handle(clonedReq);
                    }),
                    catchError((response: HttpErrorResponse) => throwError(response))
                );
            }
        }
    }
    private addToken(request: HttpRequest<any>, token: any) {
        if (token) {
            // console.log(token);
            const clone: HttpRequest<any> = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return clone;
        }
        if (!token) {
            this.router.navigateByUrl('login');
        }
        return request;
    }
    private medusaRequest(request: HttpRequest<any>) {
        request.clone({
            setHeaders: {
            }
        });
        return request;
    }
}
