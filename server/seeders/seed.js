const db = require('../config/connection');
const { User, Highscore } = require('../models');

const userData = require('./userData.json');
const highscoreData = require('./highscoreData.json');

db.once('open', async () => {
  try {
    await Highscore.deleteMany({});
    await User.deleteMany({});

    await User.create(userData);

    for (let i = 0; i < highscoreData.length; i++) {
      const { _id, score } = await Highscore.create(highscoreData[i]);
      const user = await User.findOneAndUpdate(
        { username: score },
        {
          $addToSet: {
            highscores: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});

