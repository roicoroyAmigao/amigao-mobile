/* eslint-disable max-len */
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Product } from 'src/app/checkout/shared/classes/product';
import { MedusaDataService } from 'src/app/medusa-data.service';
import { ShopActions } from './shop.actions';
export interface ShopStateModel {
    productsList?: object;
    selectedProduct: Product;
    productCartItem: object;
    regionId?: string;
    medusaCartId: string;
    medusaFullCart: object;
}
export const initShopStateModel: ShopStateModel = {
    productsList: null,
    selectedProduct: null,
    productCartItem: null,
    regionId: null,
    medusaCartId: null,
    medusaFullCart: null,
};
@State({
    name: 'ShopState',
    defaults: initShopStateModel,
})
@Injectable()
export class ShopState {
    // static PatchStateSelectedRegionId: x/any;

    constructor(
        private medusaService: MedusaDataService
    ) { }

    @Selector()
    static getMedusaProductsFromState(state: ShopStateModel) {
        return state.selectedProduct;
    }
    @Selector()
    static getProductCartItemFromState(state: ShopStateModel) {
        return state.productCartItem;
    }
    @Selector()
    static getFullCart(state: ShopStateModel) {
      return state.medusaFullCart;
    }
    @Action(ShopActions.GetMedusaProductList)
    getMedusaProductList({ patchState }: StateContext<ShopStateModel>, { }: ShopActions.GetMedusaProductList) {
        return this.medusaService.getMedusaProducts().pipe(tap(
            (result: any) => {
                console.log(result);
                patchState({
                    productsList: result,
                });
            }
        ));
    }
    @Action(ShopActions.AddProductMedusaToCart)
    addProductMedusaToCart({ patchState }: StateContext<ShopStateModel>, { cartId, variantId, quantity }: ShopActions.AddProductMedusaToCart) {
        console.log(cartId, variantId, quantity);
        return this.medusaService.addProductOnCart(cartId, variantId, quantity).pipe(tap((result: any) => {
            patchState({
                medusaFullCart: result.cart
            });
        }
        ));
    }
    @Action(ShopActions.GetMedusaCart)
    getMedusaCart({ patchState }: StateContext<ShopStateModel>, { cartId }: ShopActions.GetMedusaCart) {
        return this.medusaService.getCart(cartId)
            .pipe(tap((result: any) => {
                patchState({
                    medusaCartId: result.cart.id,
                    medusaFullCart: result.cart
                });
            }
            ));
    }
    @Action(ShopActions.CreateMedusaCart)
    createMedusaCart({ patchState }: StateContext<ShopStateModel>, { regionId }: ShopActions.CreateMedusaCart) {
        return this.medusaService.createMedusaCart(regionId)
            .pipe(tap((result: any) => {
                patchState({
                    medusaCartId: result.cart.id,
                    medusaFullCart: result.cart
                });
            }
            ));
    }
    @Action(ShopActions.PatchStateSelectedRegionId)
    patchStateSelectedRegionId({ getState, patchState }: StateContext<ShopStateModel>, { regionId }: ShopActions.PatchStateSelectedRegionId) {
        const state = getState();
        return patchState({
            regionId
        });
    }
    @Action(ShopActions.SetProductCartItem)
    setSelectedProductToState({ patchState }: StateContext<ShopStateModel>, { productCartItem }: ShopActions.SetProductCartItem) {
        console.log(productCartItem);
        return patchState({
            productCartItem
        });
    }
    @Action(ShopActions.GetProductFromState)
    getProductFromState({ getState }: StateContext<ShopStateModel>, { }: ShopActions.GetProductFromState) {
        const state = getState();
        console.log(state);
        // return patchState({
        //     selectedProduct
        // });
    }
    @Action(ShopActions.AddProductToState)
    addToCartAction({ patchState }: StateContext<ShopStateModel>, { selectedProduct }: ShopActions.AddProductToState) {
        console.log(selectedProduct);
        return patchState({
            selectedProduct
        });;
    }
    @Action(ShopActions.ClearProductFromState)
    clearProductFromState({ patchState }: StateContext<ShopStateModel>, { }: ShopActions.ClearProductFromState) {
        return patchState({
            selectedProduct: null
        });;
    }
}
