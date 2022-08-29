const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    password: String
    highscores: [Highscore]
  }

  type Highscore {
    _id: ID
    score: Int
    createdAt: String
    user: User
  }

  type Auth {
    token: ID!
    user: User
  }

 type Query {
    users: [User]
    user(id: ID!): User
    highscores: [Highscore]
    highscore(highscoreId: ID!): Highscore
    me: User
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addHighscore(score: Int!): Highscore
  }
`;

module.exports = typeDefs;
