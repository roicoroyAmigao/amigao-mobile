import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ShopPageRoutingModule } from './shop-routing.module';

import { ShopPage } from './shop.page';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material.module';
import { TranslateModule } from '@ngx-translate/core';
import { RegionFormComponent } from './components/region-form/region-form.component';
import { NgxsModule } from '@ngxs/store';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxMaskModule } from 'ngx-mask';
import { FormsState } from '../shared/store/forms.state';
import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ShopPageRoutingModule,
    SharedModule,
    TranslateModule,
    ComponentsModule,
    RouterModule
  ],
  declarations: [
    ShopPage,
  ],
  entryComponents: [
  ],
  exports: [
  ]

})
export class ShopPageModule { }
