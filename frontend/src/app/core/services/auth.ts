import { inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { LOGIN } from '../graphql/graphql.queries';
import { tap, catchError, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { FormControl, ɵValue } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private apollo = inject(Apollo);

  login(
    email: ɵValue<FormControl<string | null>> | undefined,
    password: ɵValue<FormControl<string | null>> | undefined,
  ) {
    return this.apollo
      .query({
        query: LOGIN,
        variables: { email, password },
      })
      .pipe(
        tap((res: any) => localStorage.setItem('auth_token', res.data.login.token)),
        catchError((err) => {
          console.log('Global Error Handler: ', err);
          return throwError(() => new Error(err));
        }),
      );
  }

  logout() {
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      // @ts-ignore
      if (decoded.exp < currentTime) {
        this.logout();
        return false;
      }

      return true;
    } catch (error) {
      this.logout();
      return false;
    }
  }
}
