import { gql } from 'apollo-angular';

const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      id
    }
  }
`;

const SIGNUP_USER = gql`
  mutation signupUser($username: String!, $email: String!, $password: String!) {
    signupUser(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;

const GET_EMPLOYEES = gql`
  query employees {
    employees {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
      employee_photo
    }
  }
`;

const GET_EMPLOYEE_BY_ID = gql`
  query GetEmployeeById($id: ID!) {
    employee(id: $id) {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
      employee_photo
    }
  }
`;

const GET_FILTERED_EMPLOYEES = gql`
  query GetFilteredEmployees($filter: String!) {
    getFilteredEmployees(filter: $filter) {
      id
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
      employee_photo
    }
  }
`;

const CREATE_EMPLOYEE = gql`
  mutation AddEmployee(
    $firstName: String!
    $lastName: String!
    $email: String!
    $gender: String!
    $designation: String!
    $salary: Float!
    $dateOfJoining: Date!
    $department: String!
    $employeePhoto: String!
  ) {
    createEmployee(
      first_name: $firstName
      last_name: $lastName
      email: $email
      gender: $gender
      designation: $designation
      salary: $salary
      date_of_joining: $dateOfJoining
      department: $department
      employee_photo: $employeePhoto
    ) {
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
      employee_photo
    }
  }
`;

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!
    $firstName: String
    $lastName: String
    $email: String
    $gender: String
    $designation: String
    $salary: Float
    $dateOfJoining: Date
    $department: String
    $employeePhoto: String
  ) {
    updateEmployee(
      id: $id
      first_name: $firstName
      last_name: $lastName
      email: $email
      gender: $gender
      designation: $designation
      salary: $salary
      date_of_joining: $dateOfJoining
      department: $department
      employee_photo: $employeePhoto
    ) {
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
      employee_photo
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id) {
      first_name
      last_name
      email
      gender
      designation
      salary
      date_of_joining
      department
      employee_photo
    }
  }
`;

export { LOGIN, SIGNUP_USER, GET_EMPLOYEES, GET_EMPLOYEE_BY_ID, GET_FILTERED_EMPLOYEES, CREATE_EMPLOYEE, DELETE_EMPLOYEE, UPDATE_EMPLOYEE };
