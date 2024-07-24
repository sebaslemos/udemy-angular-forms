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
    email: ['', {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur'
    }],
    password: ['',
      [Validators.required,
      Validators.minLength(8),
      createPasswordStrenghValidator()]
    ]
  });

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {

  }

}
