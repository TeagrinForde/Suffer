const { AuthenticationError } = require('apollo-server-express');
const { User, Highscore } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return await User.find({}).populate('highscores');
    },
    user: async (parent, args) => {
      return await User.findById(args.id).populate('highscores');
    },
    highscores: async () => {
      return await Highscore.find({}).populate('user');
    },
    highscore: async (parent, { highscoreId }) => {
      return Highscore.findOne({ _id: highscoreId }).populate('user');
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, password }) => {
      const user = await User.create({ username, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('No profile with this username found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },
    addHighscore: async (parent, { score }, context) => {
      // console.log(context.user);
      if (context.user) {
        const highscore = await Highscore.create({
          score
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { highscore: highscore._id } }
        );

        return highscore;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
