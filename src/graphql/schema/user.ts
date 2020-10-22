import { gql } from "apollo-server-micro";

export default gql`
  extend type Query {
    users: [User]
  }

  extend type Mutation {
    signUpUser(data: UserCreateInput!): AuthPayload!
    loginUser(data: UserLoginInput!): AuthPayload!
  }

  input UserCreateInput {
    email: String!
    name: String!
    password: String!
  }

  input UserLoginInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
  }

  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    id: String
  }
`;
