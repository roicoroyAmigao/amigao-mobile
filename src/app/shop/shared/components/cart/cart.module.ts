import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartPageRoutingModule } from './cart-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { NgxMaskModule } from 'ngx-mask';
import { ComponentsModule } from '../components.module';
import { FormsState } from 'src/app/checkout/shared/store/forms.state';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartPageRoutingModule,
    TranslateModule,
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
