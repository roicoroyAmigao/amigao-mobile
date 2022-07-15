import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { MedusaDataService } from './medusa-data.service';
import { NavigationService } from './shared/services/navigation.service';
import { CartService } from './shop/services/cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  selectedIndex;
  public appPages = [
    { title: 'Welcome', url: '/welcome', icon: 'home' },
    { title: 'Checkout', url: '/checkout', icon: 'paper-plane' },
  ];


  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

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
  }

}
