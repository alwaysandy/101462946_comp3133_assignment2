const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        minlength: 4,
        maxlength: 100,
        unique: [true, "Username is already taken"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email is already taken"],
        validate: {
            validator: (value) => {
                const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(value);
            },
            message: p => `${p} is not a valid email address.`
        }
    },
    password: {
        type: String,
        trim: true,
        minlength: 3,
        required: [true, "Password is required"]
    }
}, {
    timestamps: true
});

UserSchema.pre('save', async function() {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

UserSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model("UserModel", UserSchema);
module.exports = UserModel;