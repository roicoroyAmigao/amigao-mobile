/* eslint-disable @typescript-eslint/naming-convention */
import { Product } from 'src/app/checkout/shared/classes/product';

/* eslint-disable @typescript-eslint/no-namespace */
export namespace ShopActions {
    export class GetMedusaProductList {
        static readonly type = '[ShopActions] Get Full Medusa Product List';
    }
    export class addProductToState {
        static readonly type = '[ShopActions] Add product to state';
        constructor(public selectedProduct: Product) { }
    }
    export class ClearProductFromState {
        static readonly type = '[ShopActions] Clear product from state';
        constructor() { }
    }
    export class GetFullCart {
        static readonly type = '[ShopActions] Get Full Medusa Cart';
    }
    export class AddToCartAction {
        static readonly type = '[ShopActions] Get Full Medusa Cart';
        constructor(public productId: string, public quanity: string) { }
    }
    export class RemoveFromCartAction {
        static readonly type = '[ShopActions] Get Full Medusa Cart';
    }
    export class UpdateCartAction {
        static readonly type = '[ShopActions] Get Full Medusa Cart';
    }
}
