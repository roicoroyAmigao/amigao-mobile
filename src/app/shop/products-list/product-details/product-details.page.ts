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
import { ShopActions } from '../../shared/store/shop.actions';
import { ShopState } from '../../shared/store/shop.state';
import { CartQuantityService } from '../../shared/components/cart-counter/cart-couter.service';
import { ProductFormService } from '../../shared/components/product-form/product-form.service';
import { UtilityService } from '../../shared/utility.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  @Select(ShopState.getMedusaProductsFromState) selectedProductFromState: Observable<Product>;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: false,
  };
  selectVariantActive = false;
  // productIdResponse: string;
  // selected = true;
  // @Select(ShopState.getMedusaProductsFromState) selectedProductFromState: Observable<Product>;
  // productForm = this.fb.group(
  //   {
  //     variant: this.fb.group({
  //       varianId: [null],
  //       quantity: [null],
  //     }),
  //   },
  // );
  // activeFilter: true;
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

  // get variantControl() {
  //   return this.productForm.get('variant') as FormControl;
  // }
  ngOnInit() {
    this.selectedProductFromState.subscribe((selectedProduct) => {
      this.medusaProduct = selectedProduct;
    });

  }
  ionViewDidLeave() {
    this.store.dispatch(ShopActions.ClearProductFromState);
  }
  async closeProductList() {
    this.selectedproductService.selectedProductedCartItem.subscribe(async (productCartItem) => {
      console.log(productCartItem);
      if (productCartItem.length <= 0 && productCartItem.length === 0) {
        console.log(productCartItem);
        this.utility.showToast('add a product pleae', 'middle');
      }
      if (productCartItem != null && productCartItem.varianId != null) {
        console.log(productCartItem.varianId);
        console.log(productCartItem.quantity);
        const alert = await this.alertCtrl.create(
          {
            mode: 'ios',
            cssClass: 'my-custom-class',
            header: 'Confirm!',
            message: 'Are you sure?',
            buttons: [
              {
                text: 'No',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                  // this.store.dispatch(ShopActions.ClearProductFromState);
                }
              },
              {
                text: 'Yes',
                cssClass: 'primary',
                handler: () => {
                  this.navigation.navigateBack('shop/tabs/products-list');
                },
              }
            ]
          }
        );
        await alert.present();
      }
      else {

      }
    });
  }
}
