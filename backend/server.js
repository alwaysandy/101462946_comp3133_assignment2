require('dotenv').config();
const express = require('express');
const cors = require('cors');
const userSchema = require('./schemas/UserSchema');
const employeeSchema = require('./schemas/EmployeeSchema');
const userResolvers = require('./resolvers/UserResolvers');
const employeeResolvers = require("./resolvers/EmployeeResolvers");
const mongoose = require('mongoose');

const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require('@as-integrations/express5');
const app = express();

const DB_CONNECTION = process.env.MONGO_URI;
const connectDB = async () => {
    await mongoose.connect(DB_CONNECTION).then(success => {
        console.log(`MongoDB connected ${success}`)
    }).catch(err => {
        console.log(`Error while MongoDB connection ${err}`)
    })
}


async function startServer() {
    await connectDB();
    const server = new ApolloServer({
        typeDefs: [userSchema, employeeSchema],
        resolvers: [userResolvers, employeeResolvers],
    });

    await server.start();

    app.use(
        '/graphql',
        cors(),
        express.json(),
        expressMiddleware(server)
    );

    app.listen(process.env.PORT, () => {
        console.log(`Server started on port: ${process.env.PORT}`);
    })
}

startServer();