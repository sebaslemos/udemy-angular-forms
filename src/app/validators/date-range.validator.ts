import { AbstractControl, ValidatorFn, Validators } from "@angular/forms";

export function createPromoRangeValidator(): ValidatorFn {

  return (form: AbstractControl): Validators | null => {
    const promoStartAt: Date = form.get('promoStartAt').value;
    const promoEndAt: Date = form.get('promoEndAt').value;

    if (promoStartAt && promoEndAt) {
      return promoStartAt < promoEndAt ? null : { promoPeriod: true };
    }

    return null;
  }
}
