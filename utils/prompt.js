const prompt = require('prompt');
const colors = require('colors');

function promptUser() {
  return new Promise((resolve, reject) => {
    prompt.start();
    prompt.message = colors.magenta('Enter your MONOGO_URI:\n ');
    prompt.get(['MONGO_URI'], (err, result) => {
      if (err) {
        console.error(colors.red.bold('Error getting MONGO_URI: '), err);
        reject(err);
      } else {
        resolve(result.MONGO_URI);
      }
    });
  });
}

module.exports = promptUser;
