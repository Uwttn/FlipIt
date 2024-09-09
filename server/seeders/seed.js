const db = require("../config/connection");
const { User, Deck, Card } = require("../models");
const userSeeds = require("./userSeeds.json");
const cardSeeds = require("./cardSeeds.json");
const cleanDB = require("./cleanDB");
const deckSeeds = require("./deckSeeds.json");

db.once("open", async () => {
  try {
    await cleanDB("User", "users");
    
    await cleanDB("Deck", "decks");
    
    await cleanDB("Card", "cards");

    const users = await User.create(userSeeds);
    const decks = await Deck.create(deckSeeds);
    const cards = await Card.create(cardSeeds);

    for (let i = 0; i < decks.length; i++) {
      const deck = decks[i];
      const user = users[Math.floor(Math.random() * users.length)];
      user.decks.push(deck._id);
      await user.save();
    }

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const deck = decks[Math.floor(Math.random() * decks.length)];
      deck.cards.push(card._id);
      await deck.save();
    }
 
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
