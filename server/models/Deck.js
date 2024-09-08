const { Schema, model } = require("mongoose");

const deckSchema = new Schema({
  deckName: {
    type: String,
    required: true,
  },
  cards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Card",
    },
  ],
});

const Deck = model("Deck", deckSchema);

module.exports = Deck;
