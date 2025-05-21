import express from 'express';
import { clientRouter } from './client.routes.js';
import { parking_spacesRouter } from './parking_spaces.routes.js';

export const mainRouter = express.Router();


mainRouter.use('/clients',  clientRouter);
mainRouter.use('/parking', parking_spacesRouter);