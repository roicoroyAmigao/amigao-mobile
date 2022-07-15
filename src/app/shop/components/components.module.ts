import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from 'src/app/material.module';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';
import { RegionFormComponent } from './region-form/region-form.component';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxMaskModule } from 'ngx-mask';
import { NgxStripeModule } from 'ngx-stripe';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsState } from 'src/app/shared/store/forms.state';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TranslateModule,
        MaterialModule,
        ReactiveFormsModule,
        NgxMaskModule.forChild(),
        NgxsModule.forFeature([FormsState]),
        NgxsFormPluginModule,
        NgxStripeModule,
    ],
    declarations: [
        AddToCartComponent,
        RegionFormComponent,
    ],
    exports: [
        RegionFormComponent,
        AddToCartComponent,
    ]
})
export class ComponentsModule { }
