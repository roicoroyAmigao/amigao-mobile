/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from '../../services/cart/cart.service';
import { UtilityService } from '../../services/utility/utility.service';


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
    public cart: CartService,
    public utility: UtilityService
  ) {
    // this.minOrderQty = 1;
    // this.cart.item.cartQuantity = this.minOrderQty;
    // this.availableQty = this.cart.item.totalStock || 0;
  }

  dismiss() {
    this.modalCtrl.dismiss('hello');
  }

  increaseQuantity() {

  }

  decreaseQuantity() {

  }

  // getCartItemQty() {
  //   const index = this.cart.items.findIndex(value => value.id === this.cart.item.id);
  //   let qty = this.cart.item.cartQuantity;
  //   if (index > -1) {
  //     qty = this.cart.items[index].cartQuantity + this.cart.item.cartQuantity;
  //   }
  //   return qty;
  // }

  addToCart() {
    const itemQty = 1;
    const validOrder = itemQty;

    if (validOrder) {
      this.modalCtrl.dismiss({data: validOrder, role:'role'}  );
    } else {
      this.utility.showToast('This product is out of stock!', 'top', 'error');
    }
  }

}
