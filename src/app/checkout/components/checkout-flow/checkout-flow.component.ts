/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { StripeElementsOptions } from '@stripe/stripe-js';
import { StripePaymentElementComponent, StripeService } from 'ngx-stripe';
import { Observable } from 'rxjs';
import { MedusaDataService } from 'src/app/medusa-data.service';
import { ShopState } from 'src/app/shared/store/shop.state';
import { FormActions } from '../../shared/store/actions';
import { FormsState } from '../../shared/store/forms.state';

@Component({
  selector: 'app-checkout-flow',
  templateUrl: './checkout-flow.component.html',
  styleUrls: ['./checkout-flow.component.scss'],
})
export class CheckoutFlowComponent implements OnInit {
  @Select(ShopState.getFullCart) medusaFullCart: Observable<any>;
  @ViewChild(StripePaymentElementComponent)
  paymentElement: StripePaymentElementComponent;
  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
  paying = false;
  paymentMethod = 'stripe';
  paymentMethodsList = [];

  productsList;
  products;
  regions;
  region;
  regionId;
  // cart;
  shippingMethods;
  shippingMethod;
  variantId: string;
  paymentSessionForm = this.fb.group(
    { provider_id: [null] },
  );
  paymentMethodForm = this.fb.group(
    { provider_id: [null] },
  );
  paymentSessionsList;
  medusaCart;
  constructor(
    private fb: FormBuilder,
    private dataService: MedusaDataService,
    private stripeService: StripeService,
    private store: Store,
    private router: Router
  ) { }
  ngOnInit() {
    this.dataService.getMedusaProducts().subscribe((medusaProducts: any) => {
      this.productsList = medusaProducts.products;
      console.log(medusaProducts);
    });
    this.dataService.getMedusaRegions().subscribe((medusaReg: any) => {
      this.regions = medusaReg.regions;
    });
    this.medusaCart = this.medusaFullCart.subscribe((cart) => {
      console.log('caart', cart);
      if (cart) {
        this.medusaCart = cart;
        console.log(this.medusaCart);
      }
    });
  }
  backHome() {
    // this.router.navigateByUrl('checkout/delivery');
    this.router.navigateByUrl('checkout/home');
  }
  createMedusaCart() {
    console.log(this.region);
    if (this.region != null) {
      this.dataService.createMedusaCart(this.region).subscribe((medusaCart: any) => {
        console.log(medusaCart);
        // this.cart = medusaCart.cart;
        console.log(medusaCart.cart.id);
      });
    }
  }
  onSelectProduct(product) {
    console.log(product.variants[0].id);
    this.variantId = product.variants[0].id;
    if (this.medusaCart?.id != null) {
      this.dataService.addProductOnCart(this.medusaCart.id, this.variantId, 1).subscribe((resCart: any) => {
        console.log('product added', resCart.cart);
      });
    }
  }
  addProductMock() {
    console.log(this.medusaCart.id);
    if (this.medusaCart.id != null) {
      this.dataService.addProductOnCart(this.medusaCart.id, 'variant_01G7HVKNDN2BG5H5G73F0P1FG9', 1).subscribe((resCart: any) => {
        console.log('product added', resCart.cart);
      });
    }
  }
  addEmailToCart() {
    this.dataService.addEmailToCart(this.medusaCart.id, 'test@test.com').subscribe((resCart) => {
      console.log('email aded', resCart);
    });
  }
  addAddressToCart() {
    this.dataService.addShippingAddressToUserMockValues(this.medusaCart.id).subscribe(() => {
      this.dataService.getCart(this.medusaCart.id).subscribe((cart: any) => {
        this.dataService.getShippingOptionsFromCart(this.medusaCart.id).subscribe((resShippingOptions: any) => {
          this.shippingMethods = [];
          resShippingOptions.shipping_options.forEach(element => {
            if (element.region_id === cart.cart.region_id && element.is_return === false) {
              this.shippingMethods.push(element);
              console.log('this.shippingMethods', this.shippingMethods);
            }
          });
        });
      });
    });
  }
  addShippingMethod() {
    if (this.shippingMethod != null) {
      this.dataService.addShippingMethod(this.medusaCart.id, this.shippingMethod).subscribe(() => {
      });
    }
  }
  initPaymentSession() {
    if (this.medusaCart.id) {
      this.dataService.initializePaymentSessions(this.medusaCart.id,).subscribe((cart: any) => {
        console.log(cart.cart.payment_sessions);
        this.paymentSessionsList = cart.cart.payment_sessions;
        console.log(this.paymentMethod);
      });
    }
  }

  addPaymentSession() {
    console.log(this.paymentSessionForm.get('provider_id').value);
    if (this.paymentSessionForm.get('provider_id').value != null) {
      this.dataService.updatePaymentSession(this.medusaCart.id, this.paymentSessionForm.get('provider_id').value).subscribe((medusaCart: any) => {
        if (medusaCart.cart.payment_session.data.client_secret != null) {
          this.elementsOptions.clientSecret = medusaCart.cart.payment_session.data.client_secret;
        }
      });
    }
  }

  postStripeCard() {
    return this.stripeService.confirmPayment({
      elements: this.paymentElement.elements,
      redirect: 'if_required'
    }).subscribe(result => {
      if (result.error) {
        console.log(result.error.message);
      }
      if (result.paymentIntent.status === 'succeeded') {
        console.log({ success: true });
      }
      else {
        this.dataService.completeMedusaStripeOrder(this.medusaCart.id).subscribe((completedOrder) => {
          if (completedOrder) {
            console.log(completedOrder);
          }
        });
      }
    });

  }
  completeCart() {
    this.dataService.completeMedusaStripeOrder(this.medusaCart.id).subscribe((res) => {
      console.log(res);
    });

  }
  loginCustomer() {
    const customerData = {
      email: 'jose@test.com',
      password: 'Rwbento123!'
    };
    this.dataService.loginReturningCustomer(customerData)
      .subscribe(
        (medusaProducts) => {
          console.log(medusaProducts);
        },
        (error) => {
          console.log(error);
        },
      );
  }
  registerCustomer() {
    const newCustomerData = {
      first_name: 'Jose1',
      last_name: 'Bento1',
      email: 'jose@test.com',
      phone: '07510963961',
      password: 'Rwbento123!'
    };
    this.dataService.registerCustomer(newCustomerData).subscribe((medusaProducts) => {
      console.log(medusaProducts);
    });
  }

  deleteSession() {
    this.dataService.deletePaymentSession(this.medusaCart.id, this.paymentMethod).subscribe((medusaProducts) => {
      console.log(medusaProducts);
    });
  }
}
