import express from 'express';
import { clientController } from '../controller/client.controller.js';

export const clientRouter = express.Router();


clientRouter.get('/', clientController.getClients);
clientRouter.post(`/`, clientController.addClient);
clientRouter.delete(`/:id`, clientController.deleteClient);
clientRouter.put(`/:id`, clientController.updateClient);
clientRouter.get(`/:id`, clientController.getClientById)