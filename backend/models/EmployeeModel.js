const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, "First name is required"],
        trim: true,
    },
    last_name: {
        type: String,
        trim: true,
        required: [true, "Last name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email is already taken"],
        lowercase: true,
        validate: {
            validator: (value) => {
                const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(value);
            },
            message: p => `${p} is not a valid email address.`
        }
    },
    gender: {
        type: String,
        trim: true,
        lowercase: true,
        enum: {
            values: ["male", "female", "other"],
            message: "Gender must be male / female / other"
        },
        required: [true, "Gender is required"]
    },
    designation: {
        type: String,
        trim: true,
        required: [true, "Designation is required"]
    },
    salary: {
        type: Number,
        min: [1000, "Salary must be at least 1000"],
        required: [true, "Salary is required"]
    },
    date_of_joining: {
        type: Date,
        required: [true, "Date of joining is required"],
    },
    department: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Department is required"],
    },
    employee_photo: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Employee photo url is required"],
    }
}, {
    timestamps: true
});

const EmployeeModel = mongoose.model("EmployeeModel", EmployeeSchema);
module.exports = EmployeeModel;