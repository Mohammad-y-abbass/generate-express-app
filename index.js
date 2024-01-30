#!/usr/bin/env node
const program = require('commander');
const colors = require('colors');

const createDirectoryStructure = require('./utils/createDirStructure.js');
const addNodemonStartScript = require('./utils/addStartScript');
const initializeNpm = require('./utils/initPkg');
const installPkgs = require('./utils/installPkgs');

program
  .version('1.0.0')
  .arguments('<projectName>')
  .action(async (projectName) => {
    await createDirectoryStructure(projectName);
    initializeNpm(projectName)
      .then(() => installPkgs('express', projectName))
      .then(() => installPkgs('helmet', projectName))
      .then(() => installPkgs('morgan', projectName))
      .then(() => installPkgs('dotenv', projectName))
      .then(() => installPkgs('nodemon', projectName))
      .then(() => installPkgs('cors', projectName))
      .then(() => addNodemonStartScript(projectName))
      .then(() => {
        console.log(
          colors.magenta('Run the following commands to start the server')
        );
        console.log(colors.blue(`cd ${projectName}`));
        console.log(colors.blue('npm start'));
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  });

program.parse(process.argv);
