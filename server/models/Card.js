const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const cardSchema = new Schema({
  cardName: {
    type: String,
    required: false,
  },
  question: {
    type: String,
    required: true,
  },
  answers: {
    type: [String],
    required: true,
  }
});

const Card = model("Card", cardSchema);

module.exports = Card;
