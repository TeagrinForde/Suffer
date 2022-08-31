const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const highscoreSchema = new Schema({
  score: {
    type: Number,
    required: true,
  },
   createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  user: {
    type: String,
    required: true
  }
});

const Highscore = model('Highscore', highscoreSchema);

module.exports = Highscore;
