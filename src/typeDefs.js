const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID!): User
    admins: [User]
    admin(id: ID!): User
  }

  type Mutation {
    register(regRequest: RegisterInput!): ReqRes
    login(loginRequest: LoginInput!): ReqRes
    refreshToken(refreshTokenRequest: RefreshTokenInput!): ReqRes
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    city: String
    school: String
    university: String
    address: String
    role: Role!
  }

  input RegisterInput {
    f_name: String!
    l_name: String!
    email: String!
    password: String!
    role: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input RefreshTokenInput {
    token: String!
  }

  type ReqRes {
    status: Int!
    error: String
    message: String
    token: String
    refreshToken: String
    expirationTime: String
    username: String
    email: String
    role: String
    user: String
  }

  enum Role {
    ADMIN
    TEACHER
    STUDENT
    CUSTOMER
    MASTER
  }
`;

module.exports = typeDefs;
