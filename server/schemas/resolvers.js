const { User, Card, Deck } = require("../models"); // Import Deck model
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate({ path: "decks", strictPopulate: false });
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("decks");
    },

    decks: async (parent, { userId }) => {
      return Deck.find({ user: userId });
    },
    deck: async (parent, { deckId }) => {
      return Deck.findOne({ _id: deckId }).populate("cards");
    },
    cards: async (parent, { deck }) => {
      return Card.find({ deck }).populate({
        path: "card",
        strictPopulate: false,
      });
    },
    card: async (parent, { cardId }) => {
      return Card.findOne({ _id: cardId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id).populate("decks");
      }
      throw AuthenticationError("Not authenticated");
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
      console.log(user._id);
      const deck = await Deck.create({
        deckName,
        cards: cardIds,
        user: context.user._id,
      });
      const updateUser = await User.findOneAndUpdate(
        { _id: context.user._id },
        { $push: { decks: deck } },
        { new: true }
      ).populate("decks");
      return updateUser;
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
    addCard: async (parent, { question, answers }) => {
      const card = await Card.create({
        question,
        answers,
        deckID: deck._id,
      });
      //return card;
      const updateDeck = await User.findOneAndUpdate(
        {_id: deck._id },
        { $push: {cards: card} },
        { new: true },
      ).populate("cards")
      return updateDeck;
    },
    removeCard: async (parent, { _id }) => {
      const card = await Card.findOneAndDelete({
        _id: _id,
      });

      return card;
    },
    updateCard: async (parent, { _id, question, answers }) => {
      const updateFields = {};
      if (question) updateFields.question = question;
      if (answers) updateFields.answers = answers;

      return Card.findOneAndUpdate(
        { _id: _id },
        { $set: updateFields },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
