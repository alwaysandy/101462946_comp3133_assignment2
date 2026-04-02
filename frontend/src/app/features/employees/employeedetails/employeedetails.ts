import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { GET_EMPLOYEE_BY_ID } from '../../../core/graphql/graphql.queries';

@Component({
  selector: 'employee-details',
  imports: [RouterLink],
  templateUrl: './employeedetails.html',
  styleUrl: './employeedetails.css',
})
export class EmployeeDetails {
  private apollo = inject(Apollo);
  private cdr = inject(ChangeDetectorRef);
  employee: any = {};

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      console.log('params: ' + JSON.stringify(params));
      const id = params['id'];
      console.log(`SID: ${id}`);
      this.getEmployeeDetails(id);
    });
  }

  getEmployeeDetails(id: String) {
    this.apollo
      .query({
        query: GET_EMPLOYEE_BY_ID,
        variables: {
          id,
        },
      })
      .subscribe(({ data, error }: any) => {
        this.employee = data.employee;
        this.cdr.detectChanges();
      });
  }
}
