const { Schema, model } = require("mongoose");

const cardSchema = new Schema({
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
