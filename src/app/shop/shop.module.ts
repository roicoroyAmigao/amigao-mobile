import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ShopPageRoutingModule } from './shop-routing.module';

import { ShopPage } from './shop.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ShopPageRoutingModule
  ],
  declarations: [ShopPage]
})
export class TabsPageModule {}
