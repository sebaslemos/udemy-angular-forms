import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { createPasswordStrenghValidator } from '../validators/password-strengh.validator';


@Component({
  selector: 'login',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit {

  form = this.fb.group({
    //avoind null values when reseting the form
    email: this.fb.nonNullable.control(['', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    }]),
    password: ['',
      [Validators.required,
      Validators.minLength(8),
      createPasswordStrenghValidator()]
    ]
  });

  //private fb: NonNullableFormBuilder for non nullable form at all
  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {

  }

  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }

}
