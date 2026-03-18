const EmployeeModel = require('../models/EmployeeModel');
const { DateResolver } = require("graphql-scalars");

const employeeResolvers = {
    Date: DateResolver,

    Query: {
        employees: async () => {
            try {
                return await EmployeeModel.find();
            } catch (error) {
                throw new Error(`Failed to fetch employees: ${error}`);
            }
        },
        employee: async (_, { id }) => {
            try {
                const employee = await EmployeeModel.findById(id);
                if (!employee) {
                    throw new Error(`Employee not found`);
                }

                return employee;
            } catch (error) {
                throw new Error(`Failed to fetch employee: ${error}`);
            }
        },
        employeesByDesignationOrDepartment: async (_, { designation, department }) => {
            try {
                return await EmployeeModel.find({
                    $or: [
                        { designation },
                        { department }
                    ]
                });
            } catch (error) {
                throw new Error(`Failed to fetch employees by designation or department: ${error}`);
            }
        }
    },
    Mutation: {
        createEmployee: async (_, { first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo }) => {
            try {
                const newEmployee = new EmployeeModel({
                    first_name,
                    last_name,
                    email,
                    gender,
                    designation,
                    salary,
                    date_of_joining,
                    department,
                    employee_photo
                });
                return await newEmployee.save();
            } catch (error) {
                throw new Error(`Failed to create employee: ${error}`);
            }
        },
        updateEmployee: async (_, { id, first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo }) => {
            try {
                const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
                    id,
                    { first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo },
                    { new: true }
                );
                if (!updatedEmployee) {
                    throw new Error("Employee not found");
                }

                return updatedEmployee;
            } catch (error) {
                throw new Error(`Failed to update employee: ${error}`);
            }
        },
        deleteEmployee: async (_, { id }) => {
            try {
                const deletedEmployee = await EmployeeModel.findByIdAndDelete(id);
                if (!deletedEmployee) {
                    throw new Error("Employee not found");
                }
                return deletedEmployee;
            } catch (error) {
                throw new Error(`Failed to delete employee: ${error}`);
            }
        }
    }
}

module.exports = employeeResolvers;