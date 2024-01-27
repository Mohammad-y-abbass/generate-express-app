#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const child_process = require('child_process');
const path = require('path');

function createDirectoryStructure(projectName) {
  fs.mkdirSync(projectName);
  fs.mkdirSync(`${projectName}/src`);
  fs.copyFileSync(
    path.join(__dirname, 'template', 'index.js'),
    `${projectName}/src/index.js`
  );
  fs.mkdirSync(`${projectName}/src/config`);
  fs.writeFileSync(`${projectName}/src/config/db.js`, '');
  fs.mkdirSync(`${projectName}/src/routes`);
  fs.mkdirSync(`${projectName}/src/controllers`);
  fs.mkdirSync(`${projectName}/src/models`);
  fs.mkdirSync(`${projectName}/src/middleware`);
  fs.writeFileSync(`${projectName}/src/middleware/globalErrorHandler.js`, '');
  fs.mkdirSync(`${projectName}/src/utils`);
  fs.writeFileSync(`${projectName}/src/utils/apiError.js`, '');
  fs.writeFileSync(`${projectName}/.env`, '');
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
    console.log('Run the following commands to start the server');
    console.log(`cd ${projectName}`);
    console.log('npm start');
  });

program.parse(process.argv);
