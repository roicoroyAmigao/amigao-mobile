import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { Product } from 'src/app/checkout/shared/classes/product';
import { MedusaDataService } from 'src/app/medusa-data.service';
import { ShopActions } from './shop.actions';
export interface ShopStateModel {
    productsList?: object;
    selectedProduct: Product;
}
export const initShopStateModel: ShopStateModel = {
    productsList: null,
    selectedProduct: null
};
@State({
    name: 'ShopState',
    defaults: initShopStateModel,
})
@Injectable()
export class ShopState {

    constructor(
        private medusaService: MedusaDataService
    ) { }

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
    @Action(ShopActions.addProductToState)
    addToCartAction({ patchState }: StateContext<ShopStateModel>, { selectedProduct }: ShopActions.addProductToState) {
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
