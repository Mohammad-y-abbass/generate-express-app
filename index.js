#!/usr/bin/env node
const { Command } = require('commander');
const fs = require('fs');
const path = require('path');
const colors = require('colors');
const { SingleBar, Presets } = require('cli-progress'); // Import the progress bar
const program = new Command();

const createProject = async (appName) => {
  const targetPath = path.join(process.cwd(), appName);

  // Check if the directory already exists
  if (fs.existsSync(targetPath)) {
    console.log(colors.red(`❌ Error: Directory "${appName}" already exists.`));
    process.exit(1);
  }

  // Create the target directory
  fs.mkdirSync(targetPath, { recursive: true });

  // Initialize the progress bar
  const progressBar = new SingleBar({
    format: '{bar} {percentage}% | {value}/{total} Files',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
  });

  // Read template files to calculate total count
  const templateDir = path.join(__dirname, 'template');
  const files = [];

  const getFiles = (dir) => {
    const items = fs.readdirSync(dir);
    items.forEach((item) => {
      const fullPath = path.join(dir, item);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        getFiles(fullPath); // Recurse into subdirectories
      } else {
        files.push(fullPath);
      }
    });
  };

  getFiles(templateDir);

  // Start the progress bar with the total number of files
  progressBar.start(files.length, 0);

  // Copy template files with progress bar updates
  const copyRecursiveSync = (src, dest) => {
    const stats = fs.statSync(src);

    if (stats.isDirectory()) {
      fs.mkdirSync(dest, { recursive: true });

      const filesInDir = fs.readdirSync(src);
      filesInDir.forEach((file) => {
        const currentSrc = path.join(src, file);
        const currentDest = path.join(dest, file);
        copyRecursiveSync(currentSrc, currentDest);
      });
    } else if (stats.isFile()) {
      fs.copyFileSync(src, dest);
      progressBar.increment(); // Update progress bar after copying each file
    }
  };

  // Copy template directory to target
  copyRecursiveSync(templateDir, targetPath);

  // Stop the progress bar once copying is complete
  progressBar.stop();

  console.log(colors.green(`✅ Project "${appName}" created successfully!`));
  console.log(colors.blue(`👉 Next Steps:`));
  console.log(colors.blue('Add environment variables in .env'));
  console.log(colors.blue(`  cd ${appName}`));
  console.log(colors.blue(`   npm install`));
  console.log(colors.blue(`   npm run dev`));
};

program
  .version('1.0.0')
  .arguments('<app-name>')
  .description('Generate a new project from a template')
  .action(createProject);

program.parse(process.argv);
