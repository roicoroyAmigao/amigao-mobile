/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @angular-eslint/component-selector */
import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { ShopActions } from '../../store/shop.actions';
import { UtilityService } from '../../utility.service';
import { CartQuantityService } from '../cart-counter/cart-couter.service';
@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
})
export class AddToCartComponent {

  minOrderQty: any;
  availableQty: any;

  constructor(
    private modalCtrl: ModalController,
    private cartQuantityService: CartQuantityService,
    public navParams: NavParams,
    private store: Store
  ) {

    console.log(navParams.get('data'));
  }

  dismiss() {
    this.modalCtrl.dismiss('hello');
  }

  addToCart() {
    const itemQty = 1;
    const validOrder = itemQty;

    if (validOrder) {
      this.modalCtrl.dismiss({ data: validOrder, role: 'role' });
    } else {
      // this.utility.showToast('This product is out of stock!', 'top', 'error');
    }
  }
  ionViewDidLeave() {
    this.store.dispatch(ShopActions.ClearProductFromState);
  }
}
