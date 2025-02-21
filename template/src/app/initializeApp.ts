import express, { Application } from 'express';
import { registerControllers } from './registerControllers';
import { connectDB } from '../db/config';
import { errorHandler } from '../middleware/errorMiddleware';
import { ControllerType } from '../decorators/decorators.types';

const PORT = process.env.PORT || 3000;

export default async function initializeApp(
  app: Application,
  controllers: ControllerType[]
) {
  app.use(express.json());

  await registerControllers(app, controllers);

  app.use(errorHandler as any);

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });

  await connectDB();

  console.log('🚀 Application started!');
}
