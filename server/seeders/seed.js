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
    

    for (const deck of decks) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      await Deck.findByIdAndUpdate(deck._id, { user: randomUser._id });

      // Optionally, you can push this deck to the user's decks array if you track that in the user schema
    }
    
    await Card.create(cardSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
