import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
// import { CheckoutPageModule } from '../checkout/checkout.module';
import { MaterialModule } from '../material.module';

// import { AddressFormComponent } from './address-form/address-form.component';


@NgModule({
  imports: [
    MaterialModule,
    TranslateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // CheckoutPageModule
  ],
  declarations: [
    // AddressFormComponent
  ],
  exports: [
    // AddressFormComponent,
    MaterialModule,
    TranslateModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // CheckoutPageModule
  ]
})
export class SharedModule { }
