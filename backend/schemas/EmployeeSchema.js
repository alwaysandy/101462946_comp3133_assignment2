const gql = require('graphql-tag');

const employeeSchema = gql`
    scalar Date
    
    type Employee {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        gender: String!
        designation: String!
        salary: Float!
        date_of_joining: Date!
        department: String!
        employee_photo: String!
    },
    type Query {
        employees: [Employee]
        employee(id: ID!): Employee
        getFilteredEmployees(filter: String!): [Employee]
        employeesByDesignationOrDepartment(designation: String, department: String): [Employee]
    },
    type Mutation {
        createEmployee(
            first_name: String!, 
            last_name: String!, 
            email: String!, 
            gender: String!, 
            designation: String!, 
            salary: Float!, 
            date_of_joining: Date!, 
            department: String!, 
            employee_photo: String!
        ): Employee
        updateEmployee(
            id: ID!,
            first_name: String,
            last_name: String,
            email: String,
            gender: String
            designation: String
            salary: Float
            date_of_joining: Date,
            department: String,
            employee_photo: String
        ): Employee
        deleteEmployee(id: ID!): Employee
    }
`;

module.exports = employeeSchema;