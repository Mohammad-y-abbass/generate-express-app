#!/usr/bin/env node
const program = require('commander');

const createDirectoryStructure = require('./utils/createDirStructure.js');
const {
  initializeNpm,
  installExpress,
  installHelmet,
  installMorgan,
  installDotenv,
} = require('./utils/installPkg');
const addNodemonStartScript = require('./utils/addStartScript');

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
    addNodemonStartScript(projectName);
  });

program.parse(process.argv);
