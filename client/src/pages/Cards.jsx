import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { Link } from "react-router-dom";

const Cards = () => {
  const { deckId } = useParams();
  return (
    <div>
      <div className="flex-row justify-space-between my-4">{deckId}</div>
    </div>
  );
};

export default Cards;
