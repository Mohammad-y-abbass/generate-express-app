const child_process = require('child_process');

function initializeNpm(projectName) {
  child_process.execSync('npm init -y', { cwd: projectName });
}

function installExpress(projectName) {
  child_process.execSync('npm install express', { cwd: projectName });
}

function installHelmet(projectName) {
  child_process.execSync('npm install helmet', { cwd: projectName });
}

function installMorgan(projectName) {
  child_process.execSync('npm install morgan', { cwd: projectName });
}

function installDotenv(projectName) {
  child_process.execSync('npm install dotenv', { cwd: projectName });
}

module.exports = {
  initializeNpm,
  installExpress,
  installHelmet,
  installMorgan,
  installDotenv,
};
