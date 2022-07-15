/* eslint-disable @typescript-eslint/no-namespace */
export namespace FormActions {
  export class GetFullCart {
    static readonly type = '[Form] Get Full CArt';
  }
  export class GetProductsList {
    static readonly type = '[Form] Get GetProductsList';
    constructor() { }
  }
  export class GetRegions {
    static readonly type = '[Form] Get Regions';
    constructor() { }
  }
  export class PatchStateSelectedId {
    static readonly type = '[Form] Pacth State with Selected Region ID';
    constructor(public regionId: string) { }
  }
  export class CreateCart {
    static readonly type = '[Form] Create Cart';
    constructor(public regionId: string) { }
  }
  export class AddShippingMethod {
    static readonly type = '[Form] Add Shipping Method to Cart';
    constructor(public cartId: string, public shippingMethodForm: any) { }
  }

  export class InitializePaymentSessions {
    static readonly type = '[Form] Initialize Payment Sessions';
    constructor(public cartId: string) { }
  }
  export class AddEmailToCart {
    static readonly type = '[Form] Add Email to Cart';
    constructor(public cartId: string, public cartEmail: string) { }
  }
  export class AddShippingAddressToCart {
    static readonly type = '[Form] Add Email to Cart';
    constructor(public cartId: string, public shippingAddressForm: any) { }
  }
  export class AddBillingAddressToCart {
    static readonly type = '[Form] Add Email to Cart';
    constructor(public cartId: string, public billingAddressForm: any) { }
  }
  export class AddProductToCart {
    static readonly type = '[Form] Add Product to Cart';
    constructor(public cartId: string, public variantId: string, public quantity: number) { }
  }
}
