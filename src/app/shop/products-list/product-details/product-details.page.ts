/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/checkout/shared/classes/product';
import { NavigationService } from 'src/app/checkout/shared/services/navigation.service';
import { regionFromValidator } from 'src/app/checkout/shared/services/region-form.validator';
import { MedusaDataService } from 'src/app/medusa-data.service';
import { RegionService } from '../../shared/components/region-form/region-service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  productForm = this.fb.group(
    {
      variant: this.fb.group({
        varianId: [null],
      }),
    },
  );

  private subscription = new Subscription();
  sub: Subscription;
  params: Product;
  cartId: string;
  medusaProduct: Product;
  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private navigation: NavigationService,
    private fb: FormBuilder,
    private router: Router,
    private dataService: MedusaDataService,
    private regionService: RegionService,
    public popoverController: PopoverController
  ) {
    this.subscription.add(
      this.productForm
        .get('variant')
        .valueChanges.pipe(take(1))
        .subscribe((productIdResponse: any) => {
          console.log(productIdResponse);
        }),
    );
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe((params) => {
      this.params = params.queryParams.params;
      this.medusaProduct = params.queryParams.params;
      console.log(this.params);
      console.log(this.params);
    });
  }
  productsListPage() {
    this.navigation.navigateBack('shop/tabs/products-list');
  }
  submitForm() {
    console.log(this.productForm);
  }
  addToCart(cartId?, product?, quantity?) {
    console.log(cartId, product, quantity);
  }
}
