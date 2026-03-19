import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Login } from './features/login/login';
import { Signup } from './features/signup/signup';
import { EmployeeDetails } from './features/employees/employeedetails/employeedetails';
import { EmployeesList } from './features/employees/employeeslist/employeeslist';
import { UpdateEmployee } from './features/employees/updateemployee/updateemployee';
import { Employees } from './features/employees/employees';
import { AddEmployee } from './features/employees/addemployee/addemployee';

export const routes: Routes = [
  { path: 'login', component: Login, title: 'Login' },
  { path: 'signup', component: Signup, title: 'Signup' },
  {
    path: 'employees',
    component: Employees,
    title: 'Employees',
    canActivate: [authGuard],
    children: [
      { path: '', component: EmployeesList },
      { path: 'details/:id', component: EmployeeDetails },
      { path: 'add', component: AddEmployee },
      { path: 'update/:id', component: UpdateEmployee },
    ],
  },
  { path: '', redirectTo: '/employees', pathMatch: 'full' },
];
