const dns = require('dns');

function checkInternet() {
  return new Promise((resolve, reject) => {
    dns.lookup('npmjs.com', (err) => {
      if (err && err.code == 'ENOTFOUND') {
        reject(
          'Network error: Could not connect to the server. Please check your internet connection and try again.'
        );
      } else {
        resolve();
      }
    });
  });
}

module.exports = checkInternet;
