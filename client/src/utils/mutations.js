import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_CARD = gql`
  mutation addCard($deckId: ID!, $question: String!, $answers: [String]!) {
    addCard(deckId: $deckId, question: $question, answers: $answers) {
      _id
      deckID
      question
      answers
    }
  }
`;

export const REMOVE_CARD = gql`
  mutation removeCard($cardId: ID!) {
    removeCard(_id: $cardId) {
      _id
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation updateCard($_id: ID!, $question: String, $answers: [String]) {
    updateCard(_id: $_id, question: $question, answers: $answers) {
      _id
      question
      answers
    }
  }
`;

export const ADD_DECK = gql`
mutation addDeck($deckName: String!) {
  addDeck {
    deckName
  }
}
`;
