import { Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  SimpleGrid,
  Heading,
  Button,
  Text,
} from "@chakra-ui/react";
import { QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";
import { h2 } from "framer-motion/client";

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
    <div>
      <h1>Hi!</h1>
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
                >
                  <CardHeader>
                    <Heading size="md"> {deck.deckName}</Heading>
                  </CardHeader>
                  <CardFooter>
                    <Button>View here</Button>
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
