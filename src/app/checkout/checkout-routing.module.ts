import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutePath } from '../models/route-path.enum';

import { DeliveryPageComponent } from './components/delivery-page/delivery-page.component';
import { FormsHomeComponent } from './components/forms-home/forms-home.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { ReviewPageComponent } from './components/review-page/review-page.component';
import { ShippingPageComponent } from './components/shippping-page/shipping-page.component';
import { CanActivateForms } from './services/can-activate-forms';

const routes: Routes = [
  {
    path: '',
    component: FormsHomeComponent,
    children: [
      // {
      //   path: '',
      //   redirectTo: RoutePath.delivery,
      //   pathMatch: 'full'
      // },
      {
        path: RoutePath.delivery,
        component: DeliveryPageComponent
      },
      {
        path: RoutePath.shipping,
        component: ShippingPageComponent,
        // canActivate: [CanActivateForms]
      },
      {
        path: RoutePath.payment,
        component: PaymentPageComponent,
        // canActivate: [CanActivateForms]
      }
    ]
  },
  {
    path: RoutePath.review,
    component: ReviewPageComponent
  },
  {
    path: '',
    redirectTo: RoutePath.delivery,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutPageRoutingModule { }
