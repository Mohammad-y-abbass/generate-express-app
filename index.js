#!/usr/bin/env node
const program = require('commander');

const createDirectoryStructure = require('./utils/createDirStructure');
const {
  initializeNpm,
  installExpress,
  installHelmet,
  installMorgan,
  installDotenv,
} = require('./utils/installPkg');


program
  .version('1.0.0')
  .arguments('<projectName>')
  .action((projectName) => {
    createDirectoryStructure(projectName);
    initializeNpm(projectName);
    installExpress(projectName);
    installHelmet(projectName);
    installMorgan(projectName);
    installDotenv(projectName);
    console.log(`Express app created in ${projectName}`);
    console.log('Run the following commands to start the server');
    console.log(`cd ${projectName}`);
    console.log('npm start');
  });

program.parse(process.argv);
