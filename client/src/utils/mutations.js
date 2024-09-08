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
  mutation addCard(
    $question: String!
    $answer: String!
  ) {
    addCard(
      question: $question
      answer: $answer
    ) {
      _id
      question
      answer
    }
  }
`;


export const REMOVE_CARD = gql`
  mutation removeCard($cardId: ID!) {
    removeCard(cardId: $cardId) {
      _id
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation updateCard(
    $cardId: ID!
    $question: String
    $answer: String
  ) {
    updateCard(
      cardId: $cardId
      question: $question
      answer: $answer
    ) {
      _id
      question
      answer
    }
  }
`;
