import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { createPasswordStrenghValidator } from '../validators/password-strengh.validator';


@Component({
  selector: 'login',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit {

  //formcontrol as separete attribute
  email = new FormControl('',
    {
      validators: [Validators.required, Validators.email],
      updateOn: 'blur' //update on blur
    });

  password = new FormControl('', {
    validators: [
      Validators.required,
      Validators.minLength(8),
      createPasswordStrenghValidator()]
  })

  form = new FormGroup({
    email: this.email,
    password: this.password
  });

  constructor() {


  }

  ngOnInit() {

  }

}
