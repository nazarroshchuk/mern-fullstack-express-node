import express from "express";

import { placesController } from "../controllers/intex.js";

const placesRouter = express.Router();

// places API routes
placesRouter.get("/:pid", placesController.getPlaceById);
placesRouter.get("/user/:uid", placesController.getPlacesByUserId);
placesRouter.post('/', placesController.createPlace);
placesRouter.patch('/:pid', placesController.updatePlace);
placesRouter.delete('/:pid', placesController.deletePlace);

export default placesRouter;
