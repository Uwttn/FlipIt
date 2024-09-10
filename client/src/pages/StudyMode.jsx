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
  const [flashCard, setFlashCard] = useState(null);

  const randomCard = () => {
    const randomIndex = Math.floor(Math.random() * cards.length);
    setFlashCard(cards[randomIndex]);
    console.log(cards[randomIndex]);
  };

  useEffect(() => {
    if (cards.length > 0) {
      randomCard();
    }
  }, [data, cards]);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!flashCard) {
    return <div>No flash card available.</div>;
  }

  return (
    <div
      className="flex-row justify-center"
      style={{ backgroundColor: "#f7fafc" }}
    >
      <Box maxWidth="800px" mx="auto" p={4}>
        <h1
          style={{ display: "flex", justifyContent: "center" }}
          className="col-12 "
        >
          Study Mode
        </h1>
        <h4
          style={{ display: "flex", justifyContent: "center" }}
          className="col-12 "
        >
          Click and hold to flip the card over
        </h4>
        <Card width="500px" height="300px">
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <h3>{flashCard.question}</h3>
              </div>
              <div className="flip-card-back">
                <h3>{flashCard.answers}</h3>
              </div>
            </div>
          </div>
          <div className="flex-row justify-center">
            <div>
              <Button
                width="200px"
                colorScheme="red"
                onClick={() => randomCard()}
              >
                I know this one!
              </Button>

              <Button
                width="200px"
                colorScheme="green"
                onClick={() => randomCard()}
              >
                Save this for later
              </Button>
            </div>
          </div>
        </Card>
      </Box>
    </div>
  );
};

export default FlashCards;
