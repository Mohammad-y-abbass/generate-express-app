const child_process = require('child_process');

function initializeNpm(projectName) {
  return new Promise((resolve, reject) => {
    child_process.exec(
      'npm init -y',
      { cwd: projectName },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error initializing npm: ${error}`);
          reject(error);
        } else {
          resolve(stdout);
        }
      }
    );
  });
}

function installExpress(projectName) {
  return new Promise((resolve, reject) => {
    child_process.exec(
      'npm install express',
      { cwd: projectName },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error installing express: ${error}`);
          reject(error);
        } else {
          resolve(stdout);
        }
      }
    );
  });
}

function installHelmet(projectName) {
  return new Promise((resolve, reject) => {
    child_process.exec(
      'npm install helmet',
      { cwd: projectName },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error installing helmet: ${error}`);
          reject(error);
        } else {
          resolve(stdout);
        }
      }
    );
  });
}

function installMorgan(projectName) {
  return new Promise((resolve, reject) => {
    child_process.exec(
      'npm install morgan',
      { cwd: projectName },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error installing morgan: ${error}`);
          reject(error);
        } else {
          resolve(stdout);
        }
      }
    );
  });
}

function installDotenv(projectName) {
  return new Promise((resolve, reject) => {
    child_process.exec(
      'npm install dotenv',
      { cwd: projectName },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error installing dotenv: ${error}`);
          reject(error);
        } else {
          resolve(stdout);
        }
      }
    );
  });
}

function installCors(projectName) {
  return new Promise((resolve, reject) => {
    child_process.exec(
      'npm install cors',
      { cwd: projectName },
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error installing cors: ${error}`);
          reject(error);
        } else {
          resolve(stdout);
        }
      }
    );
  });
}

module.exports = {
  initializeNpm,
  installExpress,
  installHelmet,
  installMorgan,
  installDotenv,
  installCors,
};
