import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ImagePickerComponent } from './image-picker/image-picker.component';
import { TranslateModule } from '@ngx-translate/core';

import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { RegionFormComponent } from './region-form/region-form.component';
import { MaterialModule } from 'src/app/material.module';
import { CartPage } from './cart/cart.page';
import { CartCounterComponent } from './cart-counter/cart-counter.component';
import { ProductFormComponent } from './product-form/product-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    ImagePickerComponent,
    AddToCartComponent,
    RegionFormComponent,
    CartPage,
    CartCounterComponent,
    ProductFormComponent
  ],
  exports: [
    ImagePickerComponent,
    RegionFormComponent,
    AddToCartComponent,
    CartPage,
    CartCounterComponent,
    ProductFormComponent
  ]
})
export class ComponentsModule { }
