import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';

import { CartPage } from './cart.page';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsState } from 'src/app/shared/store/forms.state';
import { RegionFormComponent } from 'src/app/shop/components/region-form/region-form.component';
import { ComponentsModule } from '../components.module';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxStripeModule } from 'ngx-stripe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule,
    TranslateModule,
    SharedModule,
    FormsModule,
    NgxMaskModule.forChild(),
    NgxsModule.forFeature([FormsState]),
    ComponentsModule,
  ],
  declarations: [
    // CartPage,
    // RegionFormComponent
  ],
})
export class CartPageModule { }
