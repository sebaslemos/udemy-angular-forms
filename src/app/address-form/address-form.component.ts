import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder, FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
  Validators
} from '@angular/forms';
import { noop, Subscription } from 'rxjs';

@Component({
  selector: 'address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AddressFormComponent,
      multi: true
    }
  ]
})
export class AddressFormComponent implements ControlValueAccessor, OnDestroy {

  @Input()
  legend: string;

  onTouched = () => { };

  onChangeSub: Subscription;

  form: FormGroup = this.fb.group({
    addressLine1: [null, [Validators.required]],
    addressLine2: [null, [Validators.required]],
    zipCode: [null, [Validators.required]],
    city: [null, [Validators.required]]
  });

  constructor(private fb: FormBuilder) {
  }

  writeValue(obj: any): void {
    if (obj) {
      this.form.setValue(obj);
    }
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  registerOnChange(fn: any): void {
    this.onChangeSub = this.form.valueChanges.subscribe(fn);
  }

  ngOnDestroy(): void {
    this.onChangeSub.unsubscribe();
  }

}



