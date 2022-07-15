import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CheckoutPageRoutingModule } from './checkout-routing.module';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '../material.module';
import { FormComponentsModule } from './components/form.components.module';
import { RouterModule } from '@angular/router';
import { FormsState } from './shared/store/forms.state';

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
