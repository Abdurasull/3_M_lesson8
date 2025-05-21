import { Router } from "express";
import { rentalController } from "../controller/rental.controller.js";

export const rentalRouter = Router();

rentalRouter.get("/", rentalController.getRentals);
rentalRouter.post("/", rentalController.addRental);
rentalRouter.put("/:id", rentalController.updateRental);
rentalRouter.delete("/:id", rentalController.deleteRental);

