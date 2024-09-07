import { Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Heading,
  Button,
  Text,
  Box,
} from "@chakra-ui/react";
import { QUERY_ME } from "../utils/queries";
import { keyframes } from "@emotion/react";
import Auth from "../utils/auth";
import { h2 } from "framer-motion/client";

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

const DeckSelect = () => {
  // If there is no `profileId` in the URL as a parameter, execute the `QUERY_ME` query instead for the logged in user's information
  const { loading, data } = useQuery(QUERY_ME);

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
    
    <div className="flex-row justify-center" style={{backgroundColor: "#f7fafc"}}>
      <h1 style={{display: "flex", justifyContent: "center"}} className="col-12 ">Study Mode</h1>
      <h4 style={{display: "flex", justifyContent: "center"}} className="col-12 ">Select A Deck</h4>
      {profile.decks?.length > 0 && (
        <div className="deck-list">
          <SimpleGrid spacing={4} templateColumns="repeat(4, 1fr)">
            {profile.decks.map((deck) => (
              <Link to={`/deck/${deck._id}`} key={deck._id}>
                <Card
                  height="250px"
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  animation={`${fadeIn} 1s ease`}
                >
                  <CardHeader>
                    <Heading size="md"> {deck.deckName}</Heading>
                  </CardHeader>
                  <CardFooter>
                    <Button>Let's Study!</Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </SimpleGrid>
        </div>
      )}
    </div>
  );
};

export default DeckSelect;
