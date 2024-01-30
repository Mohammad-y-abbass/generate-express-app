const child_process = require('child_process');
const checkInternet = require('./checkInternet');
const colors = require('colors');

async function installPackage(packageName, projectName) {
  try {
    await checkInternet();
    return new Promise((resolve, reject) => {
      console.log(colors.yellow(`Installing ${packageName}...`));
      child_process.exec(
        `npm install ${packageName}`,
        { cwd: projectName },
        (error, stdout, stderr) => {
          if (error) {
            console.error(`Error installing ${packageName}: ${error}`);
            reject(error);
          } else {
            resolve(stdout);
            console.log(colors.green(`${packageName} installed successfully!`));
          }
        }
      );
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = installPackage;
