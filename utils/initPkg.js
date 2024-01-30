const child_process = require('child_process');
const checkInternet = require('./checkInternet');
const colors = require('colors');

async function initializeNpm(projectName) {
  try {
    await checkInternet();
    return new Promise((resolve, reject) => {
      console.log(colors.yellow('Initializing npm...'));
      child_process.exec(
        'npm init -y',
        { cwd: projectName },
        (error, stdout, stderr) => {
          if (error) {
            console.error(`Error initializing npm: ${error}`);
            reject(error);
          } else {
            resolve(stdout);
            console.log(colors.green('npm initialized successfully!'));
          }
        }
      );
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = initializeNpm;
