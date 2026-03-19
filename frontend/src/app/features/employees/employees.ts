import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_EMPLOYEES } from '../../core/graphql/graphql.queries'

@Component({
  selector: 'app-employees',
  imports: [],
  templateUrl: './employees.html',
  styleUrl: './employees.css',
})
export class Employees {
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
