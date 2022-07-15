import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material.module';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxMaskModule } from 'ngx-mask';
import { NgxStripeModule } from 'ngx-stripe';
import { FormsState } from 'src/app/shared/store/forms.state';
import { AddressFormComponent } from 'src/app/shared/address-form/address-form.component';
import { HomePage } from '../home/home.page';
import { DeliveryPageComponent } from './delivery-page/delivery-page.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { ShippingPageComponent } from './shippping-page/shipping-page.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule,
        TranslateModule,
        MaterialModule,
        ReactiveFormsModule,
    ],
    declarations: [
        AddressFormComponent,
        DeliveryPageComponent,
        ShippingPageComponent,
        PaymentPageComponent,
        ReviewPageComponent,
        HomePage,
    ],
    exports: [
        AddressFormComponent,
        DeliveryPageComponent,
        ShippingPageComponent,
        PaymentPageComponent,
        ReviewPageComponent,
        HomePage,
    ]
})
export class FormComponentsModule { }
