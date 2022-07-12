import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutPageRoutingModule } from './checkout-routing.module';

import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxMaskModule } from 'ngx-mask';
import { FormsState } from './store/forms.state';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CheckoutPageRoutingModule,
    NgxMaskModule.forChild(),
    NgxsModule.forFeature([FormsState]),
    NgxsFormPluginModule,
    TranslateModule
  ],
  declarations: [
    // DeliveryPageComponent,
    // FormsHomeComponent,
    // PaymentPageComponent,
    // ReviewPageComponent,
    // ShippingPageComponent,
  ]
})
export class CheckoutPageModule { }
