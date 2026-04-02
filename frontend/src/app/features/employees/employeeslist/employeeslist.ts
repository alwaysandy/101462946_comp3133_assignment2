import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  DELETE_EMPLOYEE,
  GET_EMPLOYEES,
  GET_EMPLOYEES_BY_DESIGNATION_OR_DEPARTMENT,
} from '../../../core/graphql/graphql.queries';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'employees-list',
  imports: [RouterLink, FormsModule],
  templateUrl: './employeeslist.html',
  styleUrl: './employeeslist.css',
})
export class EmployeesList implements OnInit {
  private apollo = inject(Apollo);
  private cdr = inject(ChangeDetectorRef);
  employees: any[] = [];

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.apollo
      .watchQuery({
        query: GET_EMPLOYEES,
      })
      .valueChanges.subscribe(({ data, error }: any) => {
        this.employees = data.employees;
        this.cdr.detectChanges();
      });
  }

  getFilteredEmployees(filter: string) {
    this.apollo
      .query({
        query: GET_EMPLOYEES_BY_DESIGNATION_OR_DEPARTMENT,
        variables: { filter },
      })
      .subscribe(({ data, error }: any) => {
        this.employees = data.employeesByDesignationOrDepartment;
        this.cdr.detectChanges();
      });
  }

  deleteEmployee(id: String) {
    this.apollo
      .mutate({
        mutation: DELETE_EMPLOYEE,
        variables: {
          id,
        },
        refetchQueries: [
          {
            query: GET_EMPLOYEES,
          },
        ],
      })
      .subscribe(({ data, error }: any) => {
        console.error(error);
      });
  }
}
