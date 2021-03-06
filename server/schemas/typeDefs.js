const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Employee {
    _id: ID!
    name: String
    email: String
    password: String
    logs: [Log]!
  }

  type Log {
    _id: ID
    name: String!
    hours_worked: Int!
    role: String!
    job_site: String!
    comments: [Comment]!
  }

  type Comment {
    _id: ID
    comment: String
  }

  type Auth {
    token: ID!
    employee: Employee
  }

  type Query {
    logs: [Log]
    employee: [Employee]
    me: Employee
    meLogs(email: String!): [Log]
    log(logId: ID!): Log
  }

  type Mutation {
    addEmployee(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addLog(name: String!, hours_worked: Int!, role: String!, job_site: Int!
    ): Log
    addComment(logId: ID!, comment: String!): Log
    removeLog(logId: ID!): Log
  }
`;

module.exports = typeDefs;
