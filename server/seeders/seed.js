const db = require("../config/connection");
const { User, Card } = require("../models");
const userSeeds = require("./userSeeds.json");
const cardSeeds = require("./cardSeeds.json");
const cleanDB = require("./cleanDB");

db.once("open", async () => {
  try {
    await cleanDB("Card", "cards");

    await cleanDB("User", "users");

    await User.create(userSeeds);

    await Card.create(cardSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
