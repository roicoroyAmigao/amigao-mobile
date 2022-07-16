import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/checkout/shared/classes/product';
import { NavigationService } from 'src/app/checkout/shared/services/navigation.service';
import { ShopActions } from '../../store/shop.actions';
import { ShopState } from '../../store/shop.state';
import { UtilityService } from '../../utility.service';
import { CartQuantityService } from '../cart-counter/cart-couter.service';
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
  medusaProduct: Product;
  activeFilter: true;
  constructor(
    private cartQuantityService: CartQuantityService,
    private navigation: NavigationService,
    private fb: FormBuilder,
    public popoverController: PopoverController,
    private store: Store,
    private productService: ProductFormService,
    private utility: UtilityService
  ) { }
  get variantControl() {
    return this.productForm.get('variant') as FormControl;
  }
  ngOnInit() {
    this.selectedProductFromState.subscribe((selectedProduct) => {
      this.medusaProduct = selectedProduct;
    });
    this.cartQuantityService.cartQuantity.subscribe((qt) => {
      this.variantControl.get('quantity').setValue(qt);
      console.log('DD', qt);
    });
  }
  onSelectVariant(variantId) {
    this.activeFilter = variantId;
    this.cartQuantityService.cartQuantity.subscribe((qt) => {
      this.variantControl.get('quantity').setValue(qt);
      this.variantControl.get('varianId').setValue(variantId);
      // console.log(
      //   this.variantControl.get('quantity').value,
      //   this.variantControl.get('varianId').value
      // );
      this.setSelectedproductToState(this.productForm.value.variant.varianId, this.productForm.value.variant.quantity);
    });
    // console.log(this.productForm.value.variant.varianId);
    // console.log(this.productForm.value.variant.quantity);
  }
  setSelectedproductToState(varianId, quantity): void {
    const data = {
      varianId,
      quantity
    };
    this.productService.selectedProductedCartItem.next(data);
    this.store.dispatch(new ShopActions.SetSelectedProductToState(data)).subscribe(((res) => {
      console.log(res.ShopState);
    }));
  }
}
