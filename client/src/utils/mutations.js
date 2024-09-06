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
    $answers: [String]!
  ) {
    addCard(
      question: $question
      answers: $answers
    ) {
      _id
      question
      answers
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($cardId: ID!, $commentText: String!) {
    addComment(cardId: $cardId, commentText: $commentText) {
      _id
      comments {
        _id
        commentText
        createdAt
      }
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

export const REMOVE_COMMENT = gql`
  mutation removeComment($cardId: ID!, $commentId: ID!) {
    removeComment(cardId: $cardId, commentId: $commentId) {
      _id
      comments {
        _id
        commentText
      }
    }
  }
`;

export const UPDATE_COMMENT = gql`
  mutation updateComment(
    $cardId: ID!
    $commentId: ID!
    $commentText: String!
  ) {
    updateComment(
      cardId: $cardId
      commentId: $commentId
      commentText: $commentText
    ) {
      _id
      comments {
        _id
        commentText
      }
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation updateCard(
    $cardId: ID!
    $question: String
    $answers: [String]
  ) {
    updateCard(
      cardId: $cardId
      question: $question
      answers: $answers
    ) {
      _id
      question
      answers
    }
  }
`;
