import { Component, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

@Component({
  selector: 'login',
  imports: [FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  loginModel = signal({
    email: '',
    password: ''
  });

  loginForm = form(this.loginModel);

  onSubmit() {

  }
}
