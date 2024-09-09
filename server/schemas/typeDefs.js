const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    decks: [Deck]
  }
  type Deck {
    _id: ID
    deckName: String
    cards: [Card]
  }
  type Card {
    _id: ID
    question: String!
    answer: String!
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    users: [User]
    user(username: String!): User
    decks: [Deck]
    deck(deckId: ID!): Deck
    cards: [Card]
    card(cardid: ID!): Card
    me: User
  }
  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addDeck(deckName: String!, cardIds: [ID]!): User
    updateDeck(_id: ID!, deckName: String!, cardIds: [ID]): User
    removeDeck(_id: ID!): Deck
    addCard(_id: ID, question: String!, answer: String!): Card
    updateCard(_id: ID!, question: String, answer: String): Card
    removeCard(_id: ID!): Card
  }
`;
module.exports = typeDefs;