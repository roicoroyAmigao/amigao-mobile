/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable max-len */
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { StripePaymentElementComponent } from 'ngx-stripe';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { FormsStateModel } from 'src/app/checkout/shared/models/forms-state-model.interface';
import { NavigationService } from 'src/app/checkout/shared/services/navigation.service';
import { FormsState } from 'src/app/checkout/shared/store/forms.state';
import { MedusaDataService } from 'src/app/medusa-data.service';
import { ShopActions } from '../../store/shop.actions';
import { ShopState } from '../../store/shop.state';
import { RegionService } from '../region-form/region-service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Select(ShopState.getProductCartItemFromState) getProductCartItemFromState: Observable<any>;
  @Select(ShopState.getFullCart) medusaFullCart: Observable<any>;
  @ViewChild(StripePaymentElementComponent)
  paymentElement: StripePaymentElementComponent;
  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
  paying = false;
  paymentMethod = 'stripe';
  paymentMethodsList = [];
  formsValues: FormsStateModel;
  sub: Subscription;
  private subscription = new Subscription();
  regionId: string;
  cartId: string;
  public cartIdSub = new BehaviorSubject<any>([]);

  medusaCart;
  selectedRegion: string;
  constructor(
    public alertController: AlertController,
  ) {

  }
  ngOnInit() {
  }
  ionViewWillEnter() {
  }
  async placeOrder() {
    this.medusaFullCart.subscribe((cart) => {
      if (cart) {
        console.log(cart);
      }
    });
  }

}
