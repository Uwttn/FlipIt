import { useParams, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
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
import { ADD_CARD, UPDATE_CARD } from "../utils/mutations";

const CardList = () => {
  const { deckId } = useParams();
  const location = useLocation();
  const deckName = location.state?.deckName;

  const { loading, data } = useQuery(QUERY_CARDS, {
    variables: { deckId },
  });

  const cards = data?.cards || [];

  // Local state to track the changes in the card values
  const [editableCards, setEditableCards] = useState([...cards]);

  // Mutations
  const [updateCard] = useMutation(UPDATE_CARD);
  const [addCard] = useMutation(ADD_CARD);

  // Sync cards from query result to local state once data is available
  React.useEffect(() => {
    if (data?.cards) {
      setEditableCards([...data.cards]); // Set initial editable card state from fetched data
    }
  }, [data]);

  // Handle card change, but only update local state for now
  const handleCardChange = (e, index, field) => {
    const updatedCards = [...editableCards];
    updatedCards[index] = { ...updatedCards[index], [field]: e.target.value };
    setEditableCards(updatedCards);
  };

  const handleSaveCard = (index) => {
    const cardToUpdate = editableCards[index];
    console.log(cardToUpdate);
    updateCard({
      variables: {
        _id: cardToUpdate._id,
        question: cardToUpdate.question,
        answers: cardToUpdate.answer,
      },
    });
  };

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
        {editableCards.map((card, index) => (
          <Card key={card._id}>
            <CardHeader>
              <Heading size="md">Card {index + 1}</Heading>
            </CardHeader>
            <CardBody>
              <FormControl mb={4}>
                <FormLabel>Question</FormLabel>
                <Input
                  value={card.question}
                  onChange={(e) => handleCardChange(e, index, "question")}
                />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Answer</FormLabel>
                <Input
                  value={card.answer}
                  onChange={(e) => handleCardChange(e, index, "answer")}
                />
              </FormControl>
            </CardBody>
            <CardFooter>
              {/* Save Button */}
              <Button colorScheme="blue" onClick={() => handleSaveCard(index)}>
                Save
              </Button>
              <Button colorScheme="red" ml={3}>
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default CardList;
