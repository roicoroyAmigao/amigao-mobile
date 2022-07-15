import { FormState } from 'src/app/checkout/models/forms-state.interface';
import { RegionFormValue } from 'src/app/checkout/models/region-form-value.interface';
import { DeliveryPageFormValue } from './delivery-page-form-value.interface';
import { PaymentPageFormValue } from './payment-page-form-value.interface';
import { ShippingPageFormValue } from './shipping-page-form-value.interface';

export interface FormsStateModel {
  regionForm: FormState<RegionFormValue>;
  deliveryForm: FormState<DeliveryPageFormValue>;
  shippingForm: FormState<ShippingPageFormValue>;
  paymentForm: FormState<PaymentPageFormValue>;
  regions?: any;
  regionId?: any;
  medusaCartId?: any;
  medusaFullCart?: any;
  productsList?: object;
}
