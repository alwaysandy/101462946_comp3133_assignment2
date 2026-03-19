import { Component, inject, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import {
  GET_EMPLOYEE_BY_ID,
  GET_EMPLOYEES,
  UPDATE_EMPLOYEE,
} from '../../../core/graphql/graphql.queries';

@Component({
  selector: 'update-employee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgbAlertModule, RouterLink],
  templateUrl: './updateemployee.html',
  styleUrl: './updateemployee.css',
})
export class UpdateEmployee implements OnInit {
  private apollo = inject(Apollo);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  error = '';
  employeeId = '';

  updateForm = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', [Validators.required]),
    designation: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required, Validators.min(0)]),
    date_of_joining: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    employee_photo: new FormControl('', []),
  });

  private convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      try {
        const base64String = await this.convertFileToBase64(file);
        this.updateForm.patchValue({
          employee_photo: base64String,
        });
      } catch (e) {
        this.error = 'Failed to process image.';
      }
    }
  }

  ngOnInit() {
    this.employeeId = this.route.snapshot.params['id'];
    if (this.employeeId) {
      this.getEmployeeDetails(this.employeeId);
    }
  }

  getEmployeeDetails(id: string) {
    this.apollo
      .query({
        query: GET_EMPLOYEE_BY_ID,
        variables: { id },
      })
      .subscribe({
        next: ({ data }: any) => {
          this.updateForm.patchValue(data.employee);
        },
        error: (err) => (this.error = 'Could not load employee details'),
      });
  }

  updateEmployee() {
    if (this.updateForm.invalid) {
      Object.keys(this.updateForm.controls).forEach((key) => {
        const controlErrors = this.updateForm.get(key)?.errors;
        if (controlErrors != null) {
          this.error =
            key + ' ' + Object.keys(controlErrors)[0] + ' ' + Object.values(controlErrors)[0];
        }
      });
      return;
    }

    const val = this.updateForm.value;
    this.apollo
      .mutate({
        mutation: UPDATE_EMPLOYEE,
        variables: {
          id: this.employeeId,
          firstName: val.first_name,
          lastName: val.last_name,
          email: val.email,
          gender: val.gender,
          designation: val.designation,
          salary: parseFloat(val.salary?.toString() || '0'),
          dateOfJoining: val.date_of_joining,
          department: val.department,
          employeePhoto: val.employee_photo,
        },
        refetchQueries: [{ query: GET_EMPLOYEES }],
      })
      .subscribe({
        next: () => this.router.navigate(['/employees']),
        error: (error) => (this.error = error.message),
      });
  }
}
