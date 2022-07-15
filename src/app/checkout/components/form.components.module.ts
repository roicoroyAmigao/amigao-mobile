import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material.module';
import { HomePage } from '../home/home.page';
import { AddressFormComponent } from '../shared/address-form/address-form.component';
import { DeliveryPageComponent } from './delivery-page/delivery-page.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { ReviewPageComponent } from './review-page/review-page.component';
import { ShippingPageComponent } from './shippping-page/shipping-page.component';

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
