const gql = require('graphql-tag');

const userSchema = gql`
    type User {
        id: ID!
        username: String!
        email: String!
    },
    type AuthPayload {
        token: String!
        id: ID!
    },
    type Query {
        login(email: String!, password: String!): AuthPayload!
    },
    type Mutation {
        signupUser(username: String!, email: String!, password: String!): User
    }
`;

module.exports = userSchema;