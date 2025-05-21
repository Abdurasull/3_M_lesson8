import { Router } from "express";
import { paymentController } from "../controller/payment.controller.js";

export const paymentRouter = Router();

paymentRouter.get('/', paymentController.getPayments);
paymentRouter.post('/', paymentController.addPayment);
paymentRouter.delete('/:id', paymentController.deletePayment);
