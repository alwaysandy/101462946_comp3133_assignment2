import { Component, inject, signal } from '@angular/core';
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
  error = '';
  signupForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      Object.keys(this.signupForm.controls).forEach((key) => {
        const controlErrors = this.signupForm.get(key)?.errors;
        if (controlErrors != null) {
          this.error =
            key + ' ' + Object.keys(controlErrors)[0] + ' ' + Object.values(controlErrors)[0];
        }
      });
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
          this.error = error;
          console.error('Signup failed', error);
        },
      });
  }
}
