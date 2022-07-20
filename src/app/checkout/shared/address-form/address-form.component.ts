/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/component-selector */
import { Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, FormBuilder, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { nameRegex } from '../regexes.const';
import { AddressFormValue } from './address-form-value.interface';

@Component({
  selector: 'afn-address-form',
  templateUrl: './address-form.component.html',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => AddressFormComponent), multi: true }]
})
export class AddressFormComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
  @Input() touched: boolean;

  addressForm = this.fb.group({
    first_name: [null, [Validators.required, Validators.pattern(nameRegex)]],
    last_name: [null, [Validators.required, Validators.pattern(nameRegex)]],
    address_1: [null, Validators.required],
    address_2: [null],
    city: [null, Validators.required],
    country_code: [null, Validators.required],
    phone: [null, Validators.required],
    postal_code: [null, Validators.required]
  });

  private subscription = new Subscription();

  onChange: any = (_: AddressFormValue) => { };
  onTouch: any = () => { };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.subscription.add(
      this.addressForm.valueChanges.subscribe((value: any) => {
        this.onChange(value);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges.touched && simpleChanges.touched.currentValue) {
      this.addressForm.markAllAsTouched();
    }
  }

  writeValue(value: null | any): void {
    if (value) {
      this.addressForm.reset(value);
    }
  }

  registerOnChange(fn: () => {}): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: (_: AddressFormValue) => {}): void {
    this.onTouch = fn;
  }
}
