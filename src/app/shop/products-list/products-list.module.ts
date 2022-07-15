import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ProductsListPageRoutingModule } from './products-list-routing.module';
import { ProductsListPage } from './products-list.page';
import { TranslateModule } from '@ngx-translate/core';
import { RegionFormComponent } from 'src/app/shop/components/region-form/region-form.component';
import { MaterialModule } from 'src/app/material.module';
import { ComponentsModule } from '../components/components.module';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxMaskModule } from 'ngx-mask';
import { NgxStripeModule } from 'ngx-stripe';
import { FormsState } from 'src/app/shared/store/forms.state';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsListPageRoutingModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsModule,
  ],
  declarations: [
    ProductsListPage,
    // RegionFormComponent
  ],
  entryComponents: [
  ],
  schemas: [
    // CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ProductsListPageModule { }
