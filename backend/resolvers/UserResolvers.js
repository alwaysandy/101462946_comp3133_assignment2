const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const userResolvers = {
    Query: {
        // Resolver to login user
        login: async (_, { email, password }) => {
            try {
                const user = await UserModel.findOne({ email });
                if (!user) {
                    throw new Error('User not found');
                }
                const isMatch = await user.comparePassword(password);
                if (!isMatch) {
                    throw new Error('Invalid password');
                }

                const userTokenInfo = { id: user._id, email: user.email };
                const token = jwt.sign(
                    userTokenInfo,
                    process.env.JWT_SECRET,
                    { expiresIn: 120 }
                );

                return {
                    token,
                    id: user._id
                };
            } catch (error) {
                throw new Error(`Failed to login user: ${error}`);
            }
        }
    },
    Mutation: {
        signupUser: async (_, { username, email, password }) => {
            try {
                const newUser = new UserModel({ username, email, password });
                return await newUser.save();
            } catch (error) {
                throw new Error(`Failed to register user: ${error}`);
            }
        }
    }
}

module.exports = userResolvers;