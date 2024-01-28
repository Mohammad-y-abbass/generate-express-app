const fs = require('fs').promises;
const path = require('path');

async function addNodemonStartScript(projectName) {
  const packageJsonPath = path.join(projectName, 'package.json');

  // Read package.json
  const packageJsonData = await fs.readFile(packageJsonPath, 'utf-8');
  const packageJson = JSON.parse(packageJsonData);

  // Add nodemon start script
  packageJson.scripts = packageJson.scripts || {};
  packageJson.scripts.start = 'nodemon src/index.js';

  // Write package.json
  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
}


module.exports = addNodemonStartScript;