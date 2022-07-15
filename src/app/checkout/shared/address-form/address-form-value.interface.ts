/* eslint-disable prefer-arrow/prefer-arrow-functions */
export interface AddressFormValue {
  firstName: any;
  lastName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  province: string;
  country: string;
  postalCode: string;
}

export function addressFormValueToHTML(addressFormValue: AddressFormValue): string {
  if (!addressFormValue) {
    return '';
  }
  return (
    addressFormValue.firstName +
    ' ' +
    addressFormValue.lastName +
    '<br>' +
    addressFormValue.addressLine1 +
    ' ' +
    addressFormValue.addressLine2 +
    '<br>' +
    addressFormValue.city +
    ', ' +
    addressFormValue.province +
    ', ' +
    addressFormValue.country +
    '<br>' +
    addressFormValue.postalCode
  );
}
