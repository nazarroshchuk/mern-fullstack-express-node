import express from 'express';
import { check } from 'express-validator';
import { placesController } from '../controllers/intex.js';
import { handleFilePlaceUpload } from '../middleware/file-upload.js';
const placesRouter = express.Router();
// places API routes
placesRouter.get('/user/:uid', placesController.getPlacesByUserId);
placesRouter.get('/:pid', placesController.getPlaceById);
placesRouter.post(
  '/',
  handleFilePlaceUpload, // Use custom handler instead of direct multer middleware
  [
    check('title').not().isEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').not().isEmpty(),
  ],
  placesController.createPlace
);
placesRouter.patch(
  '/:pid',
  handleFilePlaceUpload,
  [check('title').not().isEmpty(), check('description').isLength({ min: 5 })],
  placesController.updatePlace
);
placesRouter.delete('/:pid', placesController.deletePlace);
export default placesRouter;
