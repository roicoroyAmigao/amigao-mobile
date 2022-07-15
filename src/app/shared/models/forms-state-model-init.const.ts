import { initFormState } from 'src/app/models/forms-state-init.const';
import { FormsStateModel } from './forms-state-model.interface';

export const initFormsStateModel: FormsStateModel = {
  regionForm: initFormState,
  deliveryForm: initFormState,
  shippingForm: initFormState,
  paymentForm: initFormState,
  regions: initFormState,
  regionId: initFormState,
  medusaCartId: initFormState,
  medusaFullCart: null,
  productsList: null,
};
