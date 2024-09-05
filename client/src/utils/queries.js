import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_CARDS = gql`
  query getCards {
    cards {
      _id
      cardName
      question
      answers
    }
  }
`;

export const QUERY_SINGLE_CARD = gql`
  query getSingleCard($cardId: ID!) {
    card(cardId: $cardId) {
      _id
      cardName
      question
      answers
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;
