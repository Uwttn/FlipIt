const { User, Card, Deck } = require("../models"); // Import Deck model
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate({path: "decks", strictPopulate: false});
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate({path: "decks", strictPopulate: false});
    },
    decks: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Deck.find(params).populate({path: "cards", strictPopulate: false});
    },
    deck: async (parent, { deckId }) => {
      return Deck.findOne({ _id: deckId }).populate({path: "cards", strictPopulate: false});
    },
    cards: async (parent, {deck}) => {
      return Card.find({ deck }).populate({path: "card", strictPopulate: false});
    },
    card: async (parent, { cardId }) => {
      return Card.findOne({ _id: cardId }).populate({path: "card", strictPopulate: false});
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById( context.user._id ).populate("decks");
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
      console.log(context.user._id);
      const deck = await Deck.create({
        deckName,
        cards: cardIds,
        user: context.user._id,
      });
      const updateUser = await User.findOneAndUpdate(
        {_id: context.user._id},
        {$push: {decks: deck}},
        {new: true},
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
