import { useQuery } from "@apollo/client";
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardFooter,
  SimpleGrid,
  Heading,
  Button,
} from "@chakra-ui/react";
import { QUERY_SINGLE_DECK } from "../utils/queries";
import { keyframes } from "@emotion/react";

// Define keyframes for animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;


  // const { loading, data } = useQuery(QUERY_SINGLE_DECK), { variables: { deckId: deckId },};

// // Randomly selects a card from the chosen deck, to display in window
// const randomCard = deck.cards[Math.floor(Math.random() * deck.cards.length)];


const StudyMode = () => {


  // Check if data is returning from the `QUERY_ME` query, then the `QUERY_SINGLE_PROFILE` query
  const profile = data?.me || {};
  console.log(profile.decks);
  // Use React Router's `<Redirect />` component to redirect to personal profile page if username is yours
  // if (Auth.loggedIn()) {
  //   return <Navigate to="/study" />;
  // }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return (
      <h4>
        You need to be logged in to study! Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <h1>Study Mode: ${deck.deckName}</h1>
    <div className="flip-card">
      <div className="flip-card-front">
        <h2>${randomCard.question}</h2>
      </div>
      <div className="flip-card-back">
        <h2>${randomCard.answers}</h2>
      </div>
    </div>
    </div>
  );
};

export default StudyMode;
