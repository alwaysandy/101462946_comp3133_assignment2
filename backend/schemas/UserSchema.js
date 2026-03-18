const gql = require('graphql-tag');

const userSchema = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
    },
    type Query {
        login(email: String!, password: String!): Boolean
    },
    type Mutation {
        signupUser(username: String!, email: String!, password: String!): User
    }
`;

module.exports = userSchema;