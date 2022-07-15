import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material.module';
import { ComponentsModule } from '../shared/components/components.module';
import { ProductsListPageRoutingModule } from './products-list-routing.module';
import { ProductsListPage } from './products-list.page';

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
  ],
  entryComponents: [
  ],
  schemas: [
  ]
})
export class ProductsListPageModule { }
