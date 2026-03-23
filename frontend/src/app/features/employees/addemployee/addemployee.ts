import { Component, inject, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { CREATE_EMPLOYEE, GET_EMPLOYEES } from '../../../core/graphql/graphql.queries';

@Component({
  selector: 'add-employee',
  standalone: true,
  imports: [ReactiveFormsModule, NgbAlertModule, RouterLink],
  templateUrl: './addemployee.html',
  styleUrl: './addemployee.css',
})
export class AddEmployee {
  private apollo = inject(Apollo);
  private router = inject(Router);
  error = '';

  addForm = new FormGroup({
    first_name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    last_name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', [Validators.required]),
    designation: new FormControl('', [Validators.required]),
    salary: new FormControl('', [Validators.required, Validators.min(1000)]),
    date_of_joining: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
    employee_photo: new FormControl('', [Validators.required]),
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
        this.addForm.patchValue({
          employee_photo: base64String,
        });
      } catch (e) {
        this.error = 'Failed to process image.';
      }
    }
  }

  createEmployee() {
    if (this.addForm.invalid) {
      this.addForm.markAllAsTouched();
      Object.keys(this.addForm.controls).forEach((key) => {
        const controlErrors = this.addForm.get(key)?.errors;
        if (controlErrors != null) {
          this.error = `${key} is invalid. Please enter a valid ${key}`;
        }
        return;
      });
      return;
    }

    const val = this.addForm.value;
    console.log(val.date_of_joining);
    this.apollo
      .mutate({
        mutation: CREATE_EMPLOYEE,
        variables: {
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
