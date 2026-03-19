const EmployeeModel = require('../models/EmployeeModel');
const { DateResolver } = require("graphql-scalars");
const cloudinary = require('../config/cloudinary');

const employeeResolvers = {
    Date: DateResolver,

    Query: {
        employees: async (_, __, { user }) => {
            if (!user) { throw new Error("Unauthorized"); }

            try {
                return await EmployeeModel.find();
            } catch (error) {
                throw new Error(`Failed to fetch employees: ${error}`);
            }
        },
        employee: async (_, { id }, { user }) => {
            if (!user) { throw new Error("Unauthorized"); }
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
        employeesByDesignationOrDepartment: async (_, { designation, department }, { user }) => {
            if (!user) { throw new Error("Unauthorized"); }
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
        createEmployee: async (_, { first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo }, { user} ) => {
            if (!user) { throw new Error("Unauthorized"); }
            try {
                await cloudinary.uploader.upload(employee_photo, {upload_preset: "Assignment 2"}, (error, result)=>{
                    if (error) {
                        throw new Error(error);
                    }

                    employee_photo = result.secure_url;
                });

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
        updateEmployee: async (_, { id, first_name, last_name, email, gender, designation, salary, date_of_joining, department, employee_photo }, {user}) => {
            if (!user) { throw new Error("Unauthorized"); }
            try {
                await cloudinary.uploader.upload(employee_photo, {upload_preset: "Assignment 2"}, (error, result)=>{
                    if (error) {
                        throw new Error(error);
                    }

                    employee_photo = result.secure_url;
                });
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
        deleteEmployee: async (_, { id }, {user}) => {
            if (!user) { throw new Error("Unauthorized"); }
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