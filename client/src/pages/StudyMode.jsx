import { useParams, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Input,
  FormControl,
  FormLabel,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";
import { QUERY_CARDS } from "../utils/queries";

const FlashCards = () => {
  const { deckId } = useParams();
  const location = useLocation();
  const deckName = location.state?.deckName;


  console.log(deckId);

  const { loading, data } = useQuery(QUERY_CARDS, {
    variables: { deckId },
  });

  const cards = data?.deck?.cards || [];
  const [flashCard, setFlashCard] = useState();
  useEffect(() => {
    randomCard()
  }, [data]);

  const randomCard = () => {
    setFlashCard(cards[(Math.floor(Math.random() * cards.length))])
  };

  // Local state to track the changes in the card values
  const [editableCards, setEditableCards] = useState([]);

  // Sync cards from query result to local state once data is available
  React.useEffect(() => {
    if (data?.deck?.cards) {
      setEditableCards([...data.deck.cards]); // Sync cards once data is fetched
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box maxWidth="800px" mx="auto" p={4}>
      {/* Deck Title */}
      <Heading as="h1" mb={6} textAlign="center">
        {deckName}
      </Heading>

      {/* Card List */}
      <SimpleGrid columns={[1, 1]} spacing={4} mb={6}>
        {flashCard?(
          <Card>
            <CardBody>
                <h2>{flashCard.question}</h2>

                <h2>{flashCard.answers}</h2>
            </CardBody>
            <CardFooter>
              {/* Skip buttons: remove from viewable cards, or save card for future use */}
              <Button colorScheme="red" ml={3} onClick={randomCard}>
                I've got this!
              </Button>
              
              <Button colorScheme="green" onClick={() => handleSaveCard(index)}>
                Save this for later
              </Button>

            </CardFooter>
          </Card>
          
        ):null}
      </SimpleGrid>
    </Box>
  );
};

export default FlashCards;
