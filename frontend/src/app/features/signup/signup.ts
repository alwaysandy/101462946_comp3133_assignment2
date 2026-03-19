import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Router, RouterLink } from '@angular/router';
import { SIGNUP_USER } from '../../core/graphql/graphql.queries';
import { Apollo } from 'apollo-angular';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, NgbAlertModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  private apollo = inject(Apollo);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  error = '';
  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  onSubmit() {
    if (this.signupForm.invalid) {
      const emailErrors = this.signupForm.get('email')?.errors;
      if (emailErrors) {
        this.error = 'Valid email required';
        return;
      }

      const usernameErrors = this.signupForm.get('username')?.errors;
      if (usernameErrors) {
        this.error = 'Username min length is 6';
        return;
      }

      const passwordErrors = this.signupForm.get('password')?.errors;
      if (passwordErrors) {
        this.error = 'Password min length is 6';
        return;
      }

      return;
    }

    const val = this.signupForm.value;
    this.apollo
      .mutate({
        mutation: SIGNUP_USER,
        variables: {
          username: val.username,
          email: val.email,
          password: val.password,
        },
      })
      .subscribe({
        next: ({ data }) => {
          console.log('User created:', data);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.error = error.message;
          this.cdr.detectChanges();
          console.error('Signup failed', error);
        },
      });
  }
}
