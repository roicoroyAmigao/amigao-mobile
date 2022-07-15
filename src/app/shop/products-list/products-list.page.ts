/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { NavigationService } from 'src/app/checkout/shared/services/navigation.service';
import { FormActions } from 'src/app/checkout/shared/store/actions';
import { MedusaDataService } from 'src/app/medusa-data.service';
import { AddToCartComponent } from '../shared/components/add-to-cart/add-to-cart.component';
import { ShopActions } from '../shared/store/shop.actions';
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
    this.store.dispatch(new ShopActions.GetMedusaProductList());
  }
  async addToCartModal() {
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
  async productDetailsPage(product) {
    this.navigation.navigateForwardParams('/product-details', product).then(() => {
      this.store.dispatch(new ShopActions.addProductToState(product));
    });
  }
  search(event: any) {
    const term = event.target.value;
    console.log({ term });
  }
}
