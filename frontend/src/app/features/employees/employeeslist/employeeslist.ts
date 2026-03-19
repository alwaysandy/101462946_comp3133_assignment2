import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_EMPLOYEE_BY_ID, GET_EMPLOYEES } from '../../../core/graphql/graphql.queries';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'employees-list',
  imports: [RouterLink],
  templateUrl: './employeeslist.html',
  styleUrl: './employeeslist.css',
})
export class EmployeesList {
  private apollo = inject(Apollo);
  private cdr = inject(ChangeDetectorRef);
  employees: any[] = [];

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    console.log('getEmployees()');
    this.apollo
      .query({
        query: GET_EMPLOYEES,
      })
      .subscribe(({ data, error }: any) => {
        console.log(data);
        this.employees = data.employees;
        this.cdr.detectChanges();
        console.log(this.employees);
      });
  }
}
