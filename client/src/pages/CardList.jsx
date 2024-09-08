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

  const [newCard, setNewCard] = useState({ question: "", answer: "" });
  const { loading, data } = useQuery(QUERY_CARDS, {
    variables: { deckId },
  });

  const cards = data?.cards || [];

  console.log(data);
  const [updateCard] = useMutation(UPDATE_CARD);
  const [addCard] = useMutation(ADD_CARD);

  // Handle input change for editing existing cards
  const handleCardChange = (e, index, field) => {
    const updatedCards = [...cards];
    updatedCards[index] = { ...updatedCards[index], [field]: e.target.value };
    // Save updated question or answer
    updateCard({
      variables: { cardId: updatedCards[index]._id, ...updatedCards[index] },
    });
  };

  // Handle input change for adding new card
  const handleNewCardChange = (e) => {
    const { name, value } = e.target;
    setNewCard({ ...newCard, [name]: value });
  };

  // Handle form submission for adding a new card
  const handleAddCard = (e) => {
    e.preventDefault();
    if (newCard.question && newCard.answer) {
      addCard({
        variables: { ...newCard, deckId },
        refetchQueries: [{ query: QUERY_DECK_BY_ID, variables: { deckId } }],
      });
      // Reset new card input fields
      setNewCard({ question: "", answer: "" });
    }
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
        {cards.map((card, index) => (
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
              <Button colorScheme="red">Delete</Button>
            </CardFooter>
          </Card>
        ))}
      </SimpleGrid>

      {/* Add New Card */}
      <Box as="form" onSubmit={handleAddCard} mb={6}>
        <Heading as="h2" size="md" mb={4}>
          Add New Card
        </Heading>
        <FormControl mb={4}>
          <FormLabel>Question</FormLabel>
          <Input
            name="question"
            value={newCard.question}
            onChange={handleNewCardChange}
            placeholder="Enter question"
          />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Answer</FormLabel>
          <Input
            name="answer"
            value={newCard.answer}
            onChange={handleNewCardChange}
            placeholder="Enter answer"
          />
        </FormControl>
        <Button type="submit" colorScheme="blue">
          Add Card
        </Button>
      </Box>
    </Box>
  );
};

export default CardList;
