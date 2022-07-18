/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { State, Selector, Action, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { MedusaDataService } from 'src/app/medusa-data.service';
import { initFormsStateModel } from '../models/forms-state-model-init.const';
import { FormsStateModel } from '../models/forms-state-model.interface';
import { FormActions } from './actions';

@State({
  name: 'forms',
  defaults: initFormsStateModel
})
@Injectable()
export class FormsState {

  constructor(
    private medusaService: MedusaDataService
  ) { }

  @Selector()
  static getRegions() {
    console.log();
  }

  @Selector()
  static getFullCart(state: FormsStateModel) {
    return state.medusaFullCart;
  }
  @Selector()
  static getMedusaProductsFromState(state: FormsStateModel) {
    return state.productsList;
  }

  @Action(FormActions.GetProductsList)
  getProductsList({ patchState }: StateContext<FormsStateModel>, { }: FormActions.GetProductsList) {
    return this.medusaService.getMedusaProducts().pipe(tap(
      (result: any) => {
        console.log(result);
        patchState({
          productsList: result,
        });
      }
    ));
  }
  @Action(FormActions.GetRegions)
  getRegions({ patchState }: StateContext<FormsStateModel>, { }: FormActions.GetRegions) {
    return this.medusaService.getMedusaRegions().pipe(tap(
      (result: any) => {
        patchState({
          regions: result.regions,
        });
      }
    ));
  }
  @Action(FormActions.PatchStateSelectedRegionId)
  patchStateSelectedRegionId({ getState, patchState }: StateContext<FormsStateModel>, { regionId }: FormActions.PatchStateSelectedRegionId) {
    const state = getState();
    return patchState({
      regionId
    });
  }
  @Action(FormActions.CreateCart)
  createCart({ patchState }: StateContext<FormsStateModel>, { regionId }: FormActions.CreateCart) {
    return this.medusaService.createMedusaCart(regionId)
      .pipe(tap((result: any) => {
        patchState({
          medusaCartId: result.cart.id,
          medusaFullCart: result.cart
        });
      }
      ));
  }

  @Action(FormActions.AddBillingAddressToCart)
  addBillingAddressToCart({ patchState }: StateContext<FormsStateModel>, { cartId, billingAddressForm }: FormActions.AddBillingAddressToCart) {
    if (billingAddressForm == null || billingAddressForm == null) {
      return;
    } else {
      return this.medusaService
        .addBillingAddressToCart(cartId, billingAddressForm)
        .pipe(tap((result: any) => {
          patchState({
            medusaFullCart: result.cart
          });
        }
        ));
    }
  }

  @Action(FormActions.AddShippingAddressToCart)
  addShippingAddressToCart({ patchState }: StateContext<FormsStateModel>, { cartId, shippingAddressForm }: FormActions.AddShippingAddressToCart) {
    if (shippingAddressForm == null || shippingAddressForm === undefined) {
      return;
    } else {
      return this.medusaService.addShippingAddressToCart(cartId, shippingAddressForm)
        .pipe(tap((result: any) => {
          patchState({
            medusaFullCart: result.cart
          });
        }
        ));
    }
  }

  @Action(FormActions.AddShippingMethod)
  addShippingMethod({ patchState }: StateContext<FormsStateModel>, { cartId, shippingMethodForm }: FormActions.AddShippingMethod) {
    return this.medusaService.addShippingMethod(cartId, shippingMethodForm)
      .pipe(tap((result: any) => {
        patchState({
          medusaFullCart: result.cart
        });
      }
      ));
  }
  @Action(FormActions.InitializePaymentSessions)
  initializePaymentSessions({ getState, patchState }: StateContext<FormsStateModel>, { cartId }: FormActions.InitializePaymentSessions) {
    const state = getState();
    return this.medusaService.initializePaymentSessions(cartId)
      .pipe(tap((result: any) => {
        patchState({
          medusaFullCart: result.cart
        });
      }
      ));
  }

  @Action(FormActions.AddProductToCart)
  addProductToCart({ patchState }: StateContext<FormsStateModel>, { cartId, variantId, quantity }: FormActions.AddProductToCart) {
    console.log(cartId, variantId, quantity);
    return this.medusaService.addProductOnCart(cartId, variantId, quantity).pipe(tap((result: any) => {
      patchState({
        medusaFullCart: result.cart
      });
    }
    ));
  }

  @Action(FormActions.AddEmailToCart)
  addEmailToCart({ patchState }: StateContext<FormsStateModel>, { cartId, cartEmail }: FormActions.AddEmailToCart) {
    if (cartId == null || cartId === undefined || cartEmail == null || cartEmail === undefined) {
      return;
    } else {
      return this.medusaService.addEmailToCart(cartId, cartEmail).subscribe(
        (result: any) => {
          console.log(result.cart);
          patchState(
            {
              medusaFullCart: result.cart
            }
          );
        }
      );
    }
  }
}
