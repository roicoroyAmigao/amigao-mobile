import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopPageRoutingModule } from './shop-routing.module';
import { ShopPage } from './shop.page';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../shared/components/components.module';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { ShopState } from '../shared/store/shop.state';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ShopPageRoutingModule,
    TranslateModule,
    ComponentsModule,
    RouterModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([ShopState]),
    NgxsFormPluginModule,
  ],
  declarations: [
    ShopPage,
  ],
  entryComponents: [
  ],
  exports: [
    ShopPage
  ]

})
export class ShopPageModule { }
