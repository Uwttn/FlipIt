const { User, Card, Deck } = require("../models"); // Import Deck model
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("cards");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("cards");
    },
    decks: async (parent, args, context) => {
      return Deck.find({ user: context.user._id }).populate("cards");
    },
    deck: async (parent, { deckId }) => {
      return Deck.findOne({ _id: deckId }).populate("cards");
    },
    cards: async () => {
      return Card.find().sort({ name: 1 });
    },
    card: async (parent, { cardId }) => {
      return Card.findOne({ _id: cardId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("cards");
      }
      throw new AuthenticationError("Not authenticated");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Invalid credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Invalid credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addDeck: async (parent, { deckName, cardIds }, context) => {
      const deck = await Deck.create({
        deckName,
        cards: cardIds,
        user: context.user._id,
      });
      return deck;
    },
    removeDeck: async (parent, { deckId }) => {
      const deck = await Deck.findOneAndDelete({
        _id: deckId,
      });

      return deck;
    },
    updateDeck: async (parent, { deckId, deckName, cardIds }) => {
      const updateFields = {};
      if (deckName) updateFields.deckName = deckName;
      if (cardIds) updateFields.cards = cardIds;

      return Deck.findOneAndUpdate(
        { _id: deckId },
        { $set: updateFields },
        { new: true }
      );
    },
    addCard: async (parent, { question, answer }) => {
      const card = await Card.create({
        question,
        answer,
      });

      return card;
    },
    removeCard: async (parent, { cardId }) => {
      const card = await Card.findOneAndDelete({
        _id: cardId,
      });

      return card;
    },
    updateCard: async (parent, { cardId, question, answer }) => {
      const updateFields = {};
      if (question) updateFields.question = question;
      if (answer) updateFields.answer = answer;

      return Card.findOneAndUpdate(
        { _id: cardId },
        { $set: updateFields },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
