import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckoutPageRoutingModule } from './checkout-routing.module';

import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxMaskModule } from 'ngx-mask';
import { TranslateModule } from '@ngx-translate/core';
import { FormsState } from '../shared/store/forms.state';
import { MaterialModule } from '../material.module';
import { NgxStripeModule } from 'ngx-stripe';
import { FormComponentsModule } from './components/form.components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    CheckoutPageRoutingModule,
    TranslateModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([FormsState]),
    NgxsFormPluginModule,
    FormComponentsModule
  ],
  exports: [
  ],
  declarations: [
  ],
})
export class CheckoutPageModule { }
