#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const child_process = require('child_process');

function createDirectoryStructure(projectName) {
  fs.mkdirSync(projectName);
  fs.mkdirSync(`${projectName}/config`);
  fs.writeFileSync(`${projectName}/config/db.js`, '');
  fs.writeFileSync(`${projectName}/index.js`, '');
  fs.mkdirSync(`${projectName}/routes`);
  fs.mkdirSync(`${projectName}/controllers`);
  fs.mkdirSync(`${projectName}/models`);
  fs.mkdirSync(`${projectName}/middleware`,);
  fs.writeFileSync(`${projectName}/middleware/globalErrorHandler.js`, '');
  fs.mkdirSync(`${projectName}/utils`);
  fs.writeFileSync(`${projectName}/utils/apiError.js`, '');
}
function initializeNpm(projectName) {
  child_process.execSync('npm init -y', { cwd: projectName });
}

function installExpress(projectName) {
  child_process.execSync('npm install express', { cwd: projectName });
}

program
  .version('1.0.0')
  .arguments('<projectName>')
  .action((projectName) => {
    createDirectoryStructure(projectName);
    initializeNpm(projectName);
    installExpress(projectName);
    console.log(`Express app created in ${projectName}`);
  });

program.parse(process.argv);
