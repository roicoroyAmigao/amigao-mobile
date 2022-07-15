/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
import { createSelector } from '@ngxs/store';
import { AppStateModel } from 'src/app/models/app-state-model.interface';

export const formState = (appState: AppStateModel) => appState.forms;

export const regionForm = (appState: AppStateModel) => formState(appState).regionForm;

export const deliveryForm = (appState: AppStateModel) => formState(appState).deliveryForm;
export const shippingForm = (appState: AppStateModel) => formState(appState).shippingForm;
export const paymentForm = (appState: AppStateModel) => formState(appState).paymentForm;
//
export const isRegionFormValid = (appState: AppStateModel) => regionForm(appState).status === 'VALID';

export const isDeliveryFormValid = (appState: AppStateModel) => deliveryForm(appState).status === 'VALID';
export const isShippingFormValid = (appState: AppStateModel) => shippingForm(appState).status === 'VALID';
export const isPaymentFormValid = (appState: AppStateModel) => paymentForm(appState).status === 'VALID';
//
export const isPaymentEnabled = createSelector(
  [isRegionFormValid, isDeliveryFormValid, isShippingFormValid],
  (isRegionFormValid, deliveryFormValid, shippingFormValid) => isRegionFormValid && deliveryFormValid && shippingFormValid
);
