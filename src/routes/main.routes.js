import express from 'express';
import { clientRouter } from './client.routes.js';
import { parking_spacesRouter } from './parking_spaces.routes.js';
import { rentalRouter } from './rentals.routes.js';
import { paymentRouter } from './payments.routes.js';

export const mainRouter = express.Router();


mainRouter.use('/clients',  clientRouter);
mainRouter.use('/parking', parking_spacesRouter);
mainRouter.use('/rentals', rentalRouter);
mainRouter.use('/payments', paymentRouter);