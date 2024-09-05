const { User, Card } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("cards");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("cards");
    },
    cards: async () => {
      return Card.find().sort({ name: 1 });
    },
    card: async (parent, { cardId }) => {
      return Card.findOne({ _id: cardId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw AuthenticationError;
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
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addCard: async (parent, { cardName, type, question, answers }) => {
      const card = await Card.create({
        cardName,
        type,
        question,
        answers,
      });

      return card;
    },
    removeCard: async (parent, { cardId }, context) => {
      const card = await Card.findOneAndDelete({
        _id: cardId,
      });

      return card;
    },
    updateCard: async (
      parent,
      { cardId, cardName, type, question, answers }
    ) => {
      const updateFields = {};
      if (cardName) updateFields.cardName = cardName;
      if (question) updateFields.question = question;
      if (answers) updateFields.answers = answers;

      return Card.findOneAndUpdate(
        { _id: cardId },
        { $set: updateFields },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
