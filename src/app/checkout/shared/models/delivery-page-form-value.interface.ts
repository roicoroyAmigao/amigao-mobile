import { AddressFormValue } from '../address-form/address-form-value.interface';

export interface DeliveryPageFormValue {
  billingAddress: AddressFormValue;
  isShippingSame: boolean;
  shippingAddress?: AddressFormValue;
  createAccount: boolean;
  account: {
    email: string;
    password?: string;
    confirmPassword?: string;
  };
}
