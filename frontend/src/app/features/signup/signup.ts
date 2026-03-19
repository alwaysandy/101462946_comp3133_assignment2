import { Component, inject, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { SIGNUP_USER} from '../../core/graphql/graphql.queries';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-signup',
  imports: [FormField],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})

export class Signup {
  private apollo = inject(Apollo);
  private router = inject(Router);
  signupModel = signal({
    username: '',
    email: '',
    password: '',
  });

  signupForm = form(this.signupModel);

  onSubmit() {
    console.log("addStudent()");
    this.apollo
      .mutate({
        mutation: SIGNUP_USER,
        variables: {
          username: this.signupForm.username().value(),
          email: this.signupForm.email().value(),
          password: this.signupForm.password().value(),
        },
      })
      .subscribe({
        next: ({ data }) => {
          console.log('User created:', data);
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Signup failed', error);
        },
      });
  }
}
