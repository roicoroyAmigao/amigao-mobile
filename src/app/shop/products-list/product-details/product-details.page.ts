/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable space-before-function-paren */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/checkout/shared/classes/product';
import { NavigationService } from 'src/app/checkout/shared/services/navigation.service';
import { ShopActions } from '../../../shared/store/shop.actions';
import { ShopState } from '../../../shared/store/shop.state';
import { CartQuantityService } from '../../../shared/components/cart-counter/cart-couter.service';
import { ProductFormService } from '../../../shared/components/product-form/product-form.service';
import { UtilityService } from '../../../shared/utility.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  @Select(ShopState.getMedusaProductsFromState) selectedProductFromState: Observable<Product>;
  selectVariantActive = false;
  variant;
  private subscription = new Subscription();
  sub: Subscription;
  params: Product;
  cartId: string;
  medusaProduct: Product;
  productPrice;
  selectedQuantity: number;
  constructor(
    private cartQuantityService: CartQuantityService,
    private navigation: NavigationService,
    private utility: UtilityService,
    public popoverController: PopoverController,
    private store: Store,
    private selectedproductService: ProductFormService,
    public alertCtrl: AlertController
  ) { }
  ngOnInit() {
  }
  ionViewWillEnter(): void {
  }
  async ionViewDidLeave() {
  }
  async navigateProductListPage() {
    await this.navigation.navigateBack('shop/tabs/products-list');
  }
  async productListPage() {
    this.navigation.navigateBack('shop/tabs/products-list').then(() => {
    });
  }
}
