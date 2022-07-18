/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedusaDataService {
  getCarts(id: any) {
    throw new Error('Method not implemented.');
  }
  headers_json = new HttpHeaders().set('Content-Type', 'application/json');
  headers_form_data = new HttpHeaders().set('Content-Type', 'multipart/form-data');
  headers_url_encoded = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
  httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
  };
  public tipsData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public tipsTodayData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor(
    private http: HttpClient,
  ) {

  }
  getMedusaProducts() {
    return this.http.get(environment.medusa_store_products, { headers: this.headers_json });
  }
  getMedusaRegions() {
    return this.http.get(environment.medusa_regions, this.httpOptions);
  }
  createMedusaCart(region_id) {
    const regionForm = {
      region_id
    };
    return this.http.post(environment.create_medusa_cart, regionForm, { headers: this.headers_json });
  }
  addProductOnCart(cart_id, variant_id, quantity) {
    const addProductObj = {
      variant_id,
      quantity,
    };
    const url = `http://localhost:9000/store/carts/${cart_id}/line-items`;
    return this.http.post(url, JSON.stringify(addProductObj), { headers: this.headers_json });
  }
  getShippingMethodsList(option_id) {
    // const option_id_mock: "so_01G5CS8NMYBRPAAKMS5MPPM59A";
    const url = `http://localhost:9000/store/shipping-option/${option_id.id}/`;
    console.log(url);
    return this.http.get(url, { headers: this.headers_json });
  }
  loginReturningCustomer(returningCustomerForm): Observable<any> {
    return this.http.post(environment.medusa_store_login_customer, returningCustomerForm, { headers: this.headers_json });
  }
  registerCustomer(registerCustomerForm): Observable<any> {
    // console.log(registerCustomerForm);
    const registerForm = registerCustomerForm;
    return this.http.post(environment.medusa_store_register_customer, registerForm, { headers: this.headers_json });
  }
  getUser(email) {
    const data = {
      address: email
    };
    const url = `http://localhost:9000/store/customers/me/addresses`;
    console.log(data, email);
    return this.http.post(url, data, { headers: this.headers_json });
  }
  addShippingAddressToUser(medusaCartId, billingAddressForm): Observable<any> {
    const shippingAddressObj = {
      shipping_address: {
        address_1: billingAddressForm?.value.addressLine1,
        address_2: billingAddressForm?.value.addressLine2,
        city: billingAddressForm?.value.city,
        country_code: billingAddressForm?.value.country,
        first_name: billingAddressForm?.value.firstName,
        last_name: billingAddressForm?.value.lastName,
        phone: billingAddressForm?.value.phoneNumber,
        postal_code: billingAddressForm?.value.postalCode,
      }
    };
    const url = `http://localhost:9000/store/carts/${medusaCartId}`;
    return this.http.post(url, shippingAddressObj, this.httpOptions);
  }
  addBillingAddressToCart(medusaCartId, billingAddressForm): any {
    const data = {
      billing_address: {
        address_1: billingAddressForm?.value.addressLine1,
        address_2: billingAddressForm?.value.addressLine2,
        city: billingAddressForm?.value.city,
        country_code: billingAddressForm?.value.country,
        first_name: billingAddressForm?.value.firstName,
        last_name: billingAddressForm?.value.lastName,
        phone: billingAddressForm?.value.phoneNumber,
        postal_code: billingAddressForm?.value.postalCode,
      }
    };
    const url = `http://localhost:9000/store/carts/${medusaCartId}`;
    console.log(data);
    return this.http.post(url, data, this.httpOptions);
  }
  addShippingAddressToCart(medusaCartId, shippingAddressForm): any {
    const data = {
      shipping_address: {
        address_1: shippingAddressForm?.value.addressLine1,
        address_2: shippingAddressForm?.value.addressLine2,
        city: shippingAddressForm?.value.city,
        country_code: shippingAddressForm?.value.country,
        first_name: shippingAddressForm?.value.firstName,
        last_name: shippingAddressForm?.value.lastName,
        phone: shippingAddressForm?.value.phoneNumber,
        postal_code: shippingAddressForm?.value.postalCode,
      }
    };
    const url = `http://localhost:9000/store/carts/${medusaCartId}`;
    console.log(data);
    return this.http.post(url, data, { headers: this.headers_json });
  }
  addShippingAddressToUserMockValues(medusaCartId): Observable<any> {
    const shippingAddressObj = {
        billing_address: {
            address_1: 'addressLine1',
            address_2: 'addressLine2',
            city: 'city',
            country_code: 'GB',
            first_name: 'firstName',
            last_name: 'lastName',
            phone: 'phoneNumber',
            postal_code: 'postalCode',
        },
        shipping_address: {
            address_1: 'addressLine1',
            address_2: 'addressLine2',
            city: 'city',
            country_code: 'GB',
            first_name: 'firstName',
            last_name: 'lastName',
            phone: 'phoneNumber',
            postal_code: 'postalCode',
        },
    };
    const url = `http://localhost:9000/store/carts/${medusaCartId}`;
    return this.http.post(url, shippingAddressObj, this.httpOptions);
}
  addShippingMethod(medusaCartId, reqObj) {
    const obj = {
      option_id: reqObj,
    };
    console.log(obj);
    const url = `http://localhost:9000/store/carts/${medusaCartId}/shipping-methods`;
    return this.http.post(url, obj, { headers: this.headers_json });
  }
  getShippingOptionsFromCart(medusaCartId) {
    const url = `http://localhost:9000/store/shipping-options/${medusaCartId}`;
    return this.http.get(url, { headers: this.headers_json });
  }
  getShippingOptions() {
    const url = `http://localhost:9000/store/shipping-options`;
    return this.http.get(url, { headers: this.headers_json });
  }
  addPaymentSessions(medusaCartId, provider_id) {
    const data = { data: { provider_id } };
    const url = `http://localhost:9000/store/carts/${medusaCartId}/payment-sessions`;
    return this.http.post(url, data, { headers: this.headers_json });
  }
  initializePaymentSessions(medusaCartId) {
    const data = { data: {} };
    const url = `http://localhost:9000/store/carts/${medusaCartId}/payment-sessions`;
    return this.http.post(url, data, { headers: this.headers_json });
  }
  updatePaymentSession(medusaCartId, provider_id) {
    const data = { data: { provider_id } };
    const url = `http://localhost:9000/store/carts/${medusaCartId}/payment-sessions/${provider_id}`;
    return this.http.post(url, data, { headers: this.headers_json });

  }
  selectPaymentSession(medusaCartId, provider_id) {
    const data = { data: { provider_id } };
    const url = `http://localhost:9000/store/carts/${medusaCartId}/payment-session`;
    return this.http.post(url, data, { headers: this.headers_json });
  }
  refreshPaymentSession(medusaCartId, provider_id) {
    const data = { data: { provider_id } };
    const url = `http://localhost:9000/store/carts/${medusaCartId}/payment-sessions/:${provider_id}/refresh`;
    return this.http.post(url, data, { headers: this.headers_json });
  }
  getCart(medusaCartId) {
    const url = `http://localhost:9000/store/carts/${medusaCartId}`;
    return this.http.get(url, this.httpOptions);
  }
  // initializePaymentSessions(medusaCartId){
  //   const url = `http://localhost:9000/store/carts/${medusaCartId}/payment-session`;

  // }
  addMedusaItemToCard(medusaCartId) {
    const item = {
      variant_id: 'variant_01G5SHG182PTTFZW80EWWF9Z35',
      quantity: 1000
    };
    const url = `http://localhost:9000/store/carts/${medusaCartId}/line-items`;
    return this.http.post(url, JSON.stringify(item), { headers: this.headers_json });
  }
  getAthSession() {
    const url = `http://localhost:9000/store/auth`;
    return this.http.get(url, { headers: this.headers_json });
  }
  addEmailToCart(medusaCartId, email) {
    const data = {
      email,
    };
    const url = `http://localhost:9000/store/carts/${medusaCartId}`;
    return this.http.post(url, data, { headers: this.headers_json });
  }
  completeMedusaStripeOrder(medusaCartId) {
    const url = `http://localhost:9000/store/carts/${medusaCartId}/complete`;
    return this.http.post(url, { headers: this.headers_json });
  }
  getCopletedOrder(cartId) {
    const url = `http://localhost:9000/store/orders/cart/${cartId}`;
    return this.http.get(url, this.httpOptions);
  }
  deletePaymentSession(cartId, provider_id) {
    const url = `https://medusa-url.com/store/carts/${cartId}/payment-sessions/${provider_id}`;
    return this.http.delete(url, this.httpOptions);
  }
}
