import initializeApp from './app/initializeApp';
import { AuthController } from './features/auth/controllers/Auth.Controller';
import express from 'express';

const app = express();

initializeApp(app, [AuthController]);
