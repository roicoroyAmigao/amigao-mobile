/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { AlertController, PopoverController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { Product } from 'src/app/checkout/shared/classes/product';
import { NavigationService } from 'src/app/checkout/shared/services/navigation.service';
import { ShopActions } from '../../store/shop.actions';
import { ShopState } from '../../store/shop.state';
import { UtilityService } from '../../utility.service';
import { CartQuantityService } from '../cart-counter/cart-couter.service';
import { RegionFormComponent } from '../region-form/region-form.component';
import { RegionService } from '../region-form/region-service';
import { ProductFormService } from './product-form.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  @Select(ShopState.getMedusaProductsFromState) selectedProductFromState: Observable<Product>;
  productForm = this.fb.group(
    {
      variant: this.fb.group({
        varianId: [null],
        quantity: [null],
      }),
    },
  );
  handlerMessage;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: false,
  };
  sub: Subscription;
  medusaProduct: Product;
  activeFilter: true;
  regionId: string;
  cartId: string;
  constructor(
    private cartQuantityService: CartQuantityService,
    private navigation: NavigationService,
    private fb: FormBuilder,
    public popoverController: PopoverController,
    private store: Store,
    private productService: ProductFormService,
    private utility: UtilityService,
    private alertController: AlertController,
    private regionService: RegionService
  ) { }
  get variantControl() {
    return this.productForm.get('variant') as FormControl;
  }
  ngOnInit() {
    this.sub = this.selectedProductFromState.subscribe((selectedProduct) => {
      this.medusaProduct = selectedProduct;
    });
  }
  ionViewDidLeave() {
    this.sub.unsubscribe();
  }
  addToCart() {
    this.regionService.selectedRegionId.subscribe((selectedRegionId) => {
      if (selectedRegionId.length === 0) {
        this.presentmessageAlert('Choose a region first');
      } else {
        this.regionId = selectedRegionId;
        this.createCart(this.regionId);
        if (this.variantControl.get('quantity').value != null &&
          this.variantControl.get('varianId').value != null) {
          this.presentConfirmAlert();
        }
        if (this.variantControl.get('quantity').value == null &&
          this.variantControl.get('varianId').value == null) {
          this.presentmessageAlert('add a product');
        }
      }
    });
    // this.navigation.navigateBack('shop/tabs/products-list');
  }
  async presentConfirmAlert() {
    const alert = await this.alertController.create({
      header: 'Add this item to your cart.',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => { this.handlerMessage = 'Alert canceled'; }
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.setSelectedproductToState(this.productForm.value.variant.varianId, this.productForm.value.variant.quantity);
            setTimeout(() => {
              this.addProductToCart(this.cartId, this.productForm.value.variant.varianId, this.productForm.value.variant.quantity);
              this.navigation.navigateForward('shop/tabs/products-list');
            }, 100);
          }
        }
      ]
    });

    await alert.present();
  }
  addProductToCart(cartId?, variantId?, quantity?) {
    console.log(cartId, variantId, quantity);
    this.store.dispatch(new ShopActions.AddProductMedusaToCart(cartId, variantId, quantity)).subscribe((res) => {
      // console.log('cc', res);
      // this.navigation.navigateForward('checkout/checkout-flow');
    });
  }
  createCart(selectedRegion) {
    this.store.dispatch(new ShopActions.CreateMedusaCart(selectedRegion)).subscribe((medusaCart) => {
      if (medusaCart.ShopState.medusaCartId) {
        this.cartId = medusaCart.ShopState.medusaCartId;
      }
    });
  }

  async presentmessageAlert(message: string) {
    const alert = await this.alertController.create({
      header: message,
      buttons: [
        {
          text: 'Fine',
          role: 'cancel',
        }
      ]
    });
    await alert.present();
  }
  async presentPopover(e: Event) {
    const popover = await this.popoverController.create({
      component: RegionFormComponent,
      event: e
    });
    await popover.present();
  }
  onSelectVariant(variantId) {
    this.activeFilter = variantId;
    this.cartQuantityService.cartQuantity.subscribe((qt) => {
      this.variantControl.get('quantity').setValue(qt);
      this.variantControl.get('varianId').setValue(variantId);
      // this.setSelectedproductToState(this.productForm.value.variant.varianId, this.productForm.value.variant.quantity);
    });
    // console.log(this.productForm.value.variant.varianId);
    // console.log(this.productForm.value.variant.quantity);
  }
  async setSelectedproductToState(varianId, quantity): Promise<void> {
    const data = {
      varianId,
      quantity
    };
    this.productService.selectedProductedCartItem.next(data);
    this.store.dispatch(new ShopActions.SetProductCartItem(data)).subscribe(((res) => {
      console.log(res.ShopState);
    }));
  }
}
