import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestPasswordPageRoutingModule } from './request-password-routing.module';

import { RequestPasswordPage } from './request-password.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestPasswordPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  declarations: [RequestPasswordPage]
})
export class RequestPasswordPageModule {}
