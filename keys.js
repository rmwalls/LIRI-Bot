const chalk = require('chalk');
console.log(chalk.gray('LIRI loaded'));

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};