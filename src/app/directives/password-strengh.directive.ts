import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { createPasswordStrenghValidator } from "../validators/password-strengh.validator";

@Directive({
  selector: "[passwordStrengh]",
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordStrenghDirective, multi: true }]
})
export class PasswordStrenghDirective implements Validator {
  constructor() {
  }
  validate(control: AbstractControl): ValidationErrors | null {
    return createPasswordStrenghValidator()(control);
  }
}
