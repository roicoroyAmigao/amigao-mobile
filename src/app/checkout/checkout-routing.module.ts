import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutePath } from './models/route-path.enum';
import { DeliveryPageComponent } from './components/delivery-page/delivery-page.component';
import { PaymentPageComponent } from './components/payment-page/payment-page.component';
import { ReviewPageComponent } from './components/review-page/review-page.component';
import { ShippingPageComponent } from './components/shippping-page/shipping-page.component';
import { HomePage } from './home/home.page';
import { CanActivateForms } from './shared/services/can-activate-forms';
import { CheckoutFlowComponent } from './components/checkout-flow/checkout-flow.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      // {
      //   path: '',
      //   redirectTo: RoutePath.home,
      //   pathMatch: 'full'
      // },
      {
        path: RoutePath.home,
        // loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
        component: HomePage
      },
      {
        path: RoutePath.delivery,
        component: DeliveryPageComponent
      },
      {
        path: RoutePath.shipping,
        component: ShippingPageComponent,
        canActivate: [CanActivateForms]
      },
      {
        path: RoutePath.payment,
        component: PaymentPageComponent,
        canActivate: [CanActivateForms]
      }
    ]
  },
  {
    path: RoutePath.review,
    component: ReviewPageComponent
  },
  {
    path: RoutePath.checkoutFlow,
    component: CheckoutFlowComponent
  },
  {
    path: '',
    redirectTo: RoutePath.home,
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutPageRoutingModule { }
