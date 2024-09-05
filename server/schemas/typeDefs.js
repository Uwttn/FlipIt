const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Card {
    _id: ID
    cardName: String!
    question: String!
    answers: [String]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    cards(username: String): [Card]
    card(cardId: ID!): Card
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addCard(cardName: String!, question: String!, answers: [String]!): Card
    updateCard(cardId: ID!, cardName: String, question: String, answers: [String]): Card
      removeCard(cardId: ID!): Card
  }
`;

module.exports = typeDefs;
