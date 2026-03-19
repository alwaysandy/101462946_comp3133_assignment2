import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Auth } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  imports: [FormField],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  authService = inject(Auth);
  router = inject(Router);
  loginModel = signal({
    email: '',
    password: ''
  });

  loginForm = form(this.loginModel);

  onSubmit() {
    const email = this.loginForm.email().value();
    const password = this.loginForm.password().value();
    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.log(err);
        // this.errorMessage = 'Invalid email or password. Please try again.';
      },
    });
  }
}
