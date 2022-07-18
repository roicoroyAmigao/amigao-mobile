/* eslint-disable @typescript-eslint/naming-convention */
import { Product } from 'src/app/checkout/shared/classes/product';

/* eslint-disable @typescript-eslint/no-namespace */
export namespace ShopActions {
    export class CreateMedusaCart {
        static readonly type = '[Shop] Create Medusa Cart';
        constructor(public regionId: string) { }
    }
    export class AddProductMedusaToCart {
        static readonly type = '[Shop] Add Products to Medusa Cart with Id, cariantId and qty';
        constructor(public cartId: string, public variantId: string, public quantity: number) { }
    }
    export class GetMedusaCart {
        static readonly type = '[Shop] Get Medsa Cart With ID';
        constructor(public cartId: string) { }
    }
    export class PatchStateSelectedRegionId {
        static readonly type = '[Shop] Pacth State with Selected Region ID';
        constructor(public regionId: string) { }
    }
    export class GetMedusaProductList {
        static readonly type = '[Shop] Get Full Medusa Product List';
    }
    export class SetProductCartItem {
        static readonly type = '[ShopActions] Set Selected Product To State';
        constructor(public productCartItem) { }
    }
    export class AddProductToState {
        static readonly type = '[Shop] Add product to state';
        constructor(public selectedProduct: Product) { }
    }
    export class GetProductFromState {
        static readonly type = '[Shop] Get product from state';
        constructor() { }
    }
    export class ClearProductFromState {
        static readonly type = '[Shop] Clear product from state';
        constructor() { }
    }
    // export class GetFullCart {
    //     static readonly type = '[Shop] Get Medusa full cart form ';
    // }
    export class AddToCartAction {
        static readonly type = '[Shop] AddToCartAction';
        constructor(public varianId?: string, public quanity?: number) { }
    }
    export class RemoveFromCartAction {
        static readonly type = '[Shop] Get Full Medusa Cart';
    }
    export class UpdateCartAction {
        static readonly type = '[Shop] Get Full Medusa Cart';
    }
}
