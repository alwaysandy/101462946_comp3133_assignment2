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

export { LOGIN, SIGNUP_USER, GET_EMPLOYEES };
