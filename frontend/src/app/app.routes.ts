import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Login } from './features/login/login';
import { Employees } from './features/employees/employees';

export const routes: Routes = [
  { path: 'login', component: Login, title: 'Login' },
  { path: 'employees', component: Employees, title: 'Employees', canActivate: [authGuard] },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
];
