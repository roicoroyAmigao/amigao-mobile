/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/component-selector */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { RoutePath } from 'src/app/checkout/models/route-path.enum';
import { ShopState } from 'src/app/shared/store/shop.state';
import { StrapiService } from 'src/app/strapi.service';
import { environment } from 'src/environments/environment';
import { FormGroupErrorStateMatcher } from '../../shared/form-group-error-state-matcher';
import { passwordRegex } from '../../shared/regexes.const';
import { deliveryPageFromValidator } from '../../shared/services/delivery-page-form.validator';

@Component({
  selector: 'afn-delivery-page',
  templateUrl: './delivery-page.component.html',
  styleUrls: ['./delivery-page.component.css']
})
export class DeliveryPageComponent implements OnInit, OnDestroy {
  @Select(ShopState.getFullCart) medusaFullCart: Observable<any>;
  deliveryPageForm = this.fb.group(
    {
      billingAddress: [null, Validators.required],
      isShippingSame: [true, Validators.required],
      shippingAddress: [null],
      // createAccount: [true, Validators.required],
      // account: this.fb.group({
      //   email: ['', [Validators.required, Validators.email]],
      //   password: ['', [Validators.pattern(passwordRegex)]],
      //   confirmPassword: ['']
      // })
    },
  );

  passwordErrorStateMatcher = new FormGroupErrorStateMatcher(['password']);
  confirmPassowrdErrorStateMatcher = new FormGroupErrorStateMatcher(['confirmPassword', 'passwordMatch']);
  submitted = false;
  medusaCart
  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private strapiService: StrapiService,
  ) { }

  ngOnInit() {
    this.medusaFullCart.subscribe((cart) => {
      console.log('caart', cart);
      if (cart) {
        this.medusaCart = cart;
        console.log(this.medusaCart);
      }
    });
    this.strapiService.requestUser().then((res: any) => {
      console.log('strapi user',res);
    });

    this.subscription.add(
      this.deliveryPageForm
        .get('isShippingSame')
        .valueChanges.pipe(filter(Boolean))
        .subscribe(() => {
          this.deliveryPageForm.get('shippingAddress').reset();
        })
    );

    // this.subscription.add(
    //   this.deliveryPageForm
    //     .get('createAccount')
    //     .valueChanges.pipe(filter((createAccount) => !createAccount))
    //     .subscribe(() => {
    //       this.deliveryPageForm.get(['account', 'password']).reset();
    //       this.deliveryPageForm.get(['account', 'confirmPassword']).reset();
    //     })
    // );

    this.subscription.add(
      this.deliveryPageForm.valueChanges.subscribe(() => {
        this.submitted = false;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    this.submitted = true;
    this.deliveryPageForm.markAllAsTouched();
    if (this.deliveryPageForm.valid) {
      this.router.navigate(['checkout/' + RoutePath.shipping]);
    }
  }

  onReset() {
    this.deliveryPageForm.reset({
      // billingAddress: {},
      // isShippingSame: true,
      // shippingAddress: {},
      // createAccount: true,
      // account: {}
    });
  }
}
