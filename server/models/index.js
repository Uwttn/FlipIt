const User = require("./User");
const Card = require("./Card");
const Deck = require("./Deck");


async function createDeckWithCards() {
  
    const deck = await Deck.create({
      deckName: "Sample Deck",
    });
  
    console.log("Deck created:", deck);
  }
  
  createDeckWithCards();
  
module.exports = { User, Card, Deck };
