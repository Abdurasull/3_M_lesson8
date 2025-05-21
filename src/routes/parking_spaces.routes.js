import { Router } from "express";
import { parking_spacesController } from "../controller/parking_spaces.controller.js";


export const parking_spacesRouter = Router();

parking_spacesRouter.post("/", parking_spacesController.addParkingSpace);
parking_spacesRouter.get("/", parking_spacesController.getParkingSpaces);
parking_spacesRouter.put("/:id", parking_spacesController.updateParkingSpace);
parking_spacesRouter.delete("/:id", parking_spacesController.deleteParkingSpace);