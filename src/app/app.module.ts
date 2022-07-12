/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxStripeModule } from 'ngx-stripe';
import { IonicStorageModule } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';

import { SharedModule } from './shared/shared.module';
import { CheckoutPageModule } from './checkout/checkout.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReviewPageComponent } from './checkout/components/review-page/review-page.component';
import { DeliveryPageComponent } from './checkout/components/delivery-page/delivery-page.component';
import { FormsHomeComponent } from './checkout/components/forms-home/forms-home.component';
import { PaymentPageComponent } from './checkout/components/payment-page/payment-page.component';
import { ShippingPageComponent } from './checkout/components/shippping-page/shipping-page.component';
import { AddressFormComponent } from './shared/address-form/address-form.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    AddressFormComponent,
    DeliveryPageComponent,
    FormsHomeComponent,
    ShippingPageComponent,
    PaymentPageComponent,
    ReviewPageComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsModule.forRoot([], {
      developmentMode: !environment.production
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    NgxsFormPluginModule.forRoot(),
    NgxsResetPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot({ disabled: false }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: false }),
    NgxsStoragePluginModule.forRoot({ key: ['forms'] }),
    NgxStripeModule.forRoot(environment.STRIPE_KEY),
    SharedModule,
    // CheckoutPageModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
