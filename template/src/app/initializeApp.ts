import express, { Application } from 'express';
import { registerControllers } from './registerControllers';
import { connectDB } from '../db/config';
import { errorHandler } from '../middleware/errorMiddleware';
import { ControllerType } from '../decorators/decorators.types';
import * as colors from 'colors';

const PORT = process.env.PORT || 3000;

export default async function initializeApp(
  app: Application,
  controllers: ControllerType[]
) {
  console.log(
    colors.cyan(`  
███████ ██   ██ ██████  ██████  ███████ ███████ ███████ 
██       ██ ██  ██   ██ ██   ██ ██      ██      ██      
█████     ███   ██████  ██████  █████   ███████ ███████ 
██       ██ ██  ██      ██   ██ ██           ██      ██ 
███████ ██   ██ ██      ██   ██ ███████ ███████ ███████ 
                                                        
     `)
  );

  console.log(colors.cyan('\n┌────────────────────────────────────────────┐'));
  console.log(
    colors.cyan('│ ') +
      colors.yellow.bold('       INITIALIZING APPLICATION       ') +
      colors.cyan(' │')
  );
  console.log(colors.cyan('└────────────────────────────────────────────┘\n'));

  // Set up middleware
  console.log(colors.blue('⚙️  ') + colors.white('Setting up middleware...'));
  app.use(express.json());
  console.log(colors.green('✅ ') + colors.white('Middleware configured'));

  // Register all controllers
  console.log(
    colors.blue('⚙️  ') +
      colors.white(`Registering ${controllers.length} controllers...`)
  );
  await registerControllers(app, controllers);
  console.log(colors.green('✅ ') + colors.white('All controllers registered'));

  // Set up error handling
  console.log(
    colors.blue('⚙️  ') + colors.white('Setting up error handler...')
  );
  app.use(errorHandler as any);
  console.log(colors.green('✅ ') + colors.white('Error handler configured'));

  await connectDB();

  // Start server
  console.log(colors.blue('⚙️  ') + colors.white('Starting server...'));
  app.listen(PORT, () => {
    console.log(
      '\n' +
        colors.green('✅ ') +
        colors.white(`Server listening on port ${PORT}`)
    );

    console.log(
      colors.cyan('\n┌────────────────────────────────────────────┐')
    );
    console.log(
      colors.cyan('│ ') +
        colors.green.bold('           SERVER READY!              ') +
        colors.cyan(' │')
    );
    console.log(
      colors.cyan('│ ') +
        colors.white(
          `   http://localhost:${PORT}${' '.repeat(
            21 - PORT.toString().length
          )}`
        ) +
        colors.cyan(' │')
    );
    console.log(
      colors.cyan('└────────────────────────────────────────────┘\n')
    );
  });
}
