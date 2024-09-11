import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Box, Button, Card } from "@chakra-ui/react";
import { QUERY_CARDS } from "../utils/queries";

const FlashCards = () => {
  const { deckId } = useParams();

  const { loading, data } = useQuery(QUERY_CARDS, {
    variables: { deckId },
  });

  const [flashCard, setFlashCard] = useState(null);
  const [remainingCards, setRemainingCards] = useState([]);
  const [savedForLater, setSavedForLater] = useState([]);
  const [knownCards, setKnownCards] = useState([]);

  const cards = data?.deck?.cards || [];

  useEffect(() => {
    console.log("cards:", cards);
    console.log("remainingCards:", remainingCards);
    console.log("--------------------");
  }, [cards, remainingCards]);

  const randomCard = () => {
    console.log("inside random");
    console.log("inside random remaining " + remainingCards.length);
    console.log("inside random saved " + savedForLater.length);
    if (remainingCards.length === 0 && savedForLater.length === 0) {
      alert("You have gone through all the cards!");
      return;
    }

    if (remainingCards.length === 0 && savedForLater.length > 0) {
      console.log("inside random setting remaining to saved");
      setRemainingCards(savedForLater);
      setSavedForLater([]);
    }

    const randomIndex = Math.floor(Math.random() * remainingCards.length);
    setFlashCard(remainingCards[randomIndex]);
  };

  const handleIKnowThis = (card) => {
    setKnownCards([...knownCards, card]);
    const newRemainingCards = remainingCards.filter(
      (c) => c.question !== card.question
    );
    console.log("remaining in I know this" + newRemainingCards.length);
    setRemainingCards(newRemainingCards);
    if (newRemainingCards.length === 0 && savedForLater.length > 0) {
      setRemainingCards(savedForLater);
      setSavedForLater([]);
      console.log("Moved saved cards back to remaining cards.");
    } else if (newRemainingCards.length === 0 && savedForLater.length === 0) {
      alert("You have gone through all the cards!");
    } else {
      setRemainingCards(newRemainingCards);
      randomCard();
    }
  };

  const handleSave = (card) => {
    setSavedForLater([...savedForLater, card]);
    const newRemainingCards = remainingCards.filter(
      (c) => c.question !== card.question
    );
    console.log("remaining in saved" + newRemainingCards.length);
    setRemainingCards(newRemainingCards);
    if (newRemainingCards.length === 0 && savedForLater.length > 0) {
      setRemainingCards(savedForLater);
      setSavedForLater([]);
      console.log("Moved saved cards back to remaining cards.");
    } else if (newRemainingCards.length === 0 && savedForLater.length === 0) {
      alert("You have gone through all the cards!");
    } else {
      setRemainingCards(newRemainingCards);
      randomCard();
    }
  };

  useEffect(() => {
    if (cards.length > 0 && remainingCards.length === 0) {
      setRemainingCards(cards);
    }
  }, [data, cards]);

  useEffect(() => {
    if (remainingCards.length > 0) {
      randomCard();
    }
  }, [remainingCards]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!flashCard) {
    return <div>No flash card available.</div>;
  }

  return (
    <div
      className="flex-row justify-center"
      style={{ backgroundColor: "#f7fafc", minHeight: "100vh" }}
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
        <Card
          width="600px"
          height="350px"
          mx="auto"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
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
                width="150px"
                colorScheme="red"
                mr="30px"
                mb="20px"
                onClick={() => handleIKnowThis(flashCard)}
              >
                I know this one!
              </Button>

              <Button
                width="150px"
                colorScheme="green"
                mb="20px"
                onClick={() => handleSave(flashCard)}
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
