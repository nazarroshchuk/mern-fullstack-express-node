import express from 'express';
import { check } from 'express-validator';

import { placesController } from '../controllers/intex.js';

const placesRouter = express.Router();

// places API routes
placesRouter.get('/:pid', placesController.getPlaceById);
placesRouter.get('/user/:uid', placesController.getPlacesByUserId);
placesRouter.post(
  '/',
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').not().isEmpty(),
  ],
  placesController.createPlace
);
placesRouter.patch(
  '/:pid',
  [check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
  placesController.updatePlace
);
placesRouter.delete('/:pid', placesController.deletePlace);

export default placesRouter;
