/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MedusaDataService } from 'src/app/medusa-data.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { FormActions } from 'src/app/shared/store/actions';
import { FormsState } from 'src/app/shared/store/forms.state';

import { AddToCartComponent } from '../components/add-to-cart/add-to-cart.component';
import { CartService } from '../services/cart/cart.service';
import { ProductsService } from '../services/products/products.service';
import { UtilityService } from '../services/utility/utility.service';
import { CartFacade } from '../shop.facade';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.page.html',
  styleUrls: ['./products-list.page.scss'],
})
export class ProductsListPage {
  // set app banner slides
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    }
  };
  products: Observable<any>;
  viewState$: Observable<any>;
  bannerImages: any = [];
  //searchTerm: string;
  productsList;
  constructor(
    public routerOutlet: IonRouterOutlet,
    public modalCtrl: ModalController,
    private actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private facade: CartFacade,
    private navigation: NavigationService,
    private store: Store,
    private dataService: MedusaDataService
  ) { }
  ionViewWillEnter(): any {
    this.getProductListFromState();
    this.viewState$ = this.facade.viewState$;
  }
  getProductListFromState() {
    this.store.dispatch(new FormActions.GetProductsList());
  }
  async addToCartModal(item) {
    console.log(item);

    const modal = await this.modalCtrl.create({
      component: AddToCartComponent,
      cssClass: 'add-to-cart-modal',
      presentingElement: this.routerOutlet.nativeEl
    });

    await modal.present();
    await modal.onWillDismiss().then((result) => {
      console.log(result);
    }).catch((err) => {
      console.log('err :>> ', err);
    });
  }
  async welcomePage() {
    this.navigation.navigateForward('/welcome');
  }
  async productDetailsPage() {
    // this.navigation.navigateForward('/welcome');
  }
  search(event: any) {
    const term = event.target.value;
    console.log({ term });
  }
}
