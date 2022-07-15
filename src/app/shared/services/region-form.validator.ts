/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { FormGroup } from '@angular/forms';
import { RegionFormValue } from '../models/region-form-value.interface';

export function regionFromValidator(regionPageFrom: FormGroup): { [key: string]: any } | null {
  const formValue: RegionFormValue = regionPageFrom.value;

  return regionFromValueValidator(formValue);
}

export function regionFromValueValidator(deliveryPageFromValue: RegionFormValue): { [key: string]: any } | null {
  const errors = {};

  return Object.keys(errors).length ? errors : null;
}
