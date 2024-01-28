const fs = require('fs').promises;
const path = require('path');
const cliProgress = require('cli-progress');

async function createDirectoryStructure(projectName) {
  const bar1 = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );
  const templateDir = path.join(__dirname, '..', 'template');

  try {
    const totalSteps = 9; // Total number of steps
    let currentStep = 0; // Current step

    bar1.start(100, 0); // Start the progress bar

    // Helper function to update progress
    const updateProgress = () => {
      currentStep++;
      bar1.update(Math.ceil((currentStep / totalSteps) * 100)); // Update progress based on current step
    };

    // Artificial delay function
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Create project directory
    await fs.mkdir(projectName);
    await delay(100); // Add artificial delay
    updateProgress(); // Update progress

    // Create src directory
    await fs.mkdir(path.join(projectName, 'src'));
    await delay(100); // Add artificial delay
    updateProgress(); // Update progress

    // Copy index.js
    await fs.copyFile(
      path.join(templateDir, 'index.js'),
      path.join(projectName, 'src', 'index.js')
    );
    await delay(100); // Add artificial delay
    updateProgress(); // Update progress

    // Create config directory
    await fs.mkdir(path.join(projectName, 'src', 'config'));
    await delay(100); // Add artificial delay
    updateProgress(); // Update progress

    // Create db.js (empty file)
    await fs.writeFile(path.join(projectName, 'src', 'config', 'db.js'), '');
    await delay(100); // Add artificial delay
    updateProgress(); // Update progress

    // Create routes, controllers, models, and middleware directories
    await Promise.all(
      ['routes', 'controllers', 'models', 'middleware'].map(async (dir) => {
        await fs.mkdir(path.join(projectName, 'src', dir));
        await delay(100); // Add artificial delay
      })
    );
    updateProgress(); // Update progress

    // Copy globalErrorHandler.js
    await fs.copyFile(
      path.join(templateDir, 'globalErrorHandler.js'),
      path.join(projectName, 'src', 'middleware', 'globalErrorHandler.js')
    );
    await delay(100); // Add artificial delay
    updateProgress(); // Update progress

    // Create utils directory
    await fs.mkdir(path.join(projectName, 'src', 'utils'));
    await delay(100); // Add artificial delay
    updateProgress(); // Update progress

    // Copy apiError.js
    await fs.copyFile(
      path.join(templateDir, 'apiError.js'),
      path.join(projectName, 'src', 'utils', 'apiError.js')
    );
    await delay(100); // Add artificial delay
    updateProgress(); // Update progress

    // Copy .env
    await fs.copyFile(
      path.join(templateDir, '.env'),
      path.join(projectName, '.env')
    );
    await delay(100); // Add artificial delay
    updateProgress(); // Update progress

    bar1.stop(); // Stop the progress bar
  } catch (error) {
    console.error(error);
    bar1.stop(); // Stop the progress bar in case of error
  }
}

module.exports = createDirectoryStructure;
