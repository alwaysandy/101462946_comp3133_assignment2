import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Auth } from '../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'login',
  imports: [FormField, RouterLink, NgbAlert, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private cdr = inject(ChangeDetectorRef);
  authService = inject(Auth);
  router = inject(Router);
  error = '';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      const emailErrors = this.loginForm.get('email')?.errors;
      if (emailErrors) {
        this.error = 'Valid email required';
        return;
      }

      const passwordErrors = this.loginForm.get('password')?.errors;
      if (passwordErrors) {
        this.error = 'Password required';
        return;
      }

      return;
    }

    const val = this.loginForm.value;
    this.authService.login(val.email, val.password).subscribe({
      next: () => {
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.error = 'Invalid email or password. Please try again.';
        this.cdr.detectChanges();
      },
    });
  }
}
