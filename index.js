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
  .action(async (projectName) => {
    await createDirectoryStructure(projectName);
    initializeNpm(projectName)
      .then(() => installExpress(projectName))
      .then(() => installHelmet(projectName))
      .then(() => installMorgan(projectName))
      .then(() => installDotenv(projectName))
      .then(() => addNodemonStartScript(projectName))
      .catch((error) => {
        console.error('Error:', error);
      });
  });

program.parse(process.argv);
