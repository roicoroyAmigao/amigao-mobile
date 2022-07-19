/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @angular-eslint/component-class-suffix */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnInit } from '@angular/core';
import { IonRouterOutlet, ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { NavigationService } from 'src/app/checkout/shared/services/navigation.service';
import { FormActions } from 'src/app/checkout/shared/store/actions';
import { MedusaDataService } from 'src/app/medusa-data.service';
import { AddToCartComponent } from '../../shared/components/add-to-cart/add-to-cart.component';
import { ProductFormService } from '../../shared/components/product-form/product-form.service';
import { RegionService } from '../../shared/components/region-form/region-service';
import { ShopActions } from '../../shared/store/shop.actions';
import { ShopState } from '../../shared/store/shop.state';
import { UtilityService } from '../../shared/utility.service';
import { CartFacade } from '../shop.facade';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.page.html',
  styleUrls: ['./products-list.page.scss'],
})
export class ProductsListPage {
  @Select(ShopState.getProductCartItemFromState) getProductCartItemFromState: Observable<any>;
  @Select(ShopState.getFullCart) medusaFullCart: Observable<any>;
  products: Observable<any>;
  viewState$: Observable<any>;
  bannerImages: any = [];
  //searchTerm: string;
  productsList;
  sub: Subscription;
  cartId: string;
  constructor(
    public routerOutlet: IonRouterOutlet,
    public modalCtrl: ModalController,
    private actionSheetController: ActionSheetController,
    public alertController: AlertController,
    private facade: CartFacade,
    private navigation: NavigationService,
    private store: Store,
    private dataService: MedusaDataService,
    private regionService: RegionService,
    private utility: UtilityService,
  ) { }
  ionViewWillEnter(): any {
    // this.utility.presentLoading('loading...').then(() => {
    //   this.getProductListFromState();
    // });
    this.getProductListFromState();
  }
  getProductListFromState(): void {
    this.store.dispatch(new ShopActions.GetMedusaProductList()).subscribe(((res) => {
      this.productsList = res.ShopState;
    }));
    // this.regionService.selectedRegionId.subscribe((selectedRegion) => {
    //   this.selectedRegion = selectedRegion;
    //   console.log(this.selectedRegion);
    // });
    // this.getProductCartItemFromState.subscribe((res) => {
    //   console.log(res);
    // });
    // this.utility.dismissLoading();
  }


  // async addToCartModal(p) {
  //   await this.store.dispatch(ShopActions.ClearProductFromState).subscribe(async () => {
  //     await this.store.dispatch(new ShopActions.AddProductToState(p));
  //     this.navigation.navigateForward('/product-details').then(() => this.utility.dismissLoading());
  //     // const modal = await this.modalCtrl.create({
  //     //   component: AddToCartComponent,
  //     //   cssClass: 'add-to-cart-modal',
  //     //   presentingElement: this.routerOutlet.nativeEl,
  //     // });
  //     // await modal.present();
  //   });
  // }
  async productDetailsPage(product) {
    this.navigation.navigateForward('/product-details').then(() => {
      this.store.dispatch(new ShopActions.AddProductToState(product));
    });
  }
  addToCart(cartId?, product?, quantity?) {
    console.log(cartId, product, quantity);
  }
  async welcomePage() {
    this.navigation.navigateForward('/welcome');
  }
  search(event: any) {
    const term = event.target.value;
    console.log({ term });
  }
}
