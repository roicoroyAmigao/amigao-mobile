/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { CartService } from '../../services/cart/cart.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { MedusaDataService } from 'src/app/medusa-data.service';

import { NavigationService } from 'src/app/shared/services/navigation.service';
import { FormsStateModel } from 'src/app/shared/models/forms-state-model.interface';
import { FormActions } from 'src/app/shared/store/actions';
import { FormsState } from 'src/app/shared/store/forms.state';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  @Select(FormsState.getFullCart) medusaFullCart: Observable<any>;

  formsValues: FormsStateModel;
  sub: Subscription;
  private subscription = new Subscription();
  regionId: string;
  cartId: string;
  public cartIdSub = new BehaviorSubject<any>([]);
  regionService: any;
  constructor(
    public cart: CartService,
    private router: Router,
    public alertController: AlertController,
    private store: Store,
    private dataService: MedusaDataService,
    private navigation: NavigationService
  ) { }

  ionViewWillEnter() {
    this.cart.unseen = 0;
    this.cart.getCartTotalQty();
    this.cart.totalPrice();
  }
  async placeOrder(cart) {
    let variantId;
      console.log('caart', cart);
    // if (this.regionId.length === 0) {
    //   const alert = await this.alertController.create({
    //     message: 'You must choose a region first, please.',
    //     buttons: ['OK']
    //   });
    //   await alert.present();
    // } else {
    //   console.log('caart', cart);
    //   // this.store.dispatch(new FormActions.CreateCart(this.regionId))
    //   //   .subscribe((newCart) => {
    //   //     this.store.dispatch(new FormActions.AddProductToCart(newCart.forms.medusaCartId, cart.item.varitant, cart.item.cartQuantity))
    //   //       .subscribe(() => {
    //   //         this.dataService.initializePaymentSessions(newCart.forms.medusaCartId).subscribe((res) => {
    //   //           this.navigation.navigateForward('checkout/start');
    //   //         });
    //   //       });
    //   //   });
    // }
  }

  ngOnInit() {
    console.log('item');
  }
}
