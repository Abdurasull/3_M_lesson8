import express from 'express';
import { clientRouter } from './client.routes.js';

export const mainRouter = express.Router();


mainRouter.use('/clients',  clientRouter);