import express from 'express';
import { usersController } from '../controllers/intex.js';
import { check } from 'express-validator';
import fileUpload from '../middleware/file-upload.js';
import HttpError from '../models/http-error.js';

const userRouter = express.Router();

// Middleware to handle multer errors
const handleFileUpload = (req, res, next) => {
  fileUpload.single('image')(req, res, err => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(new HttpError('File too large. Maximum size is 500KB.', 400));
      }
      if (err.message.includes('Invalid file type')) {
        return next(new HttpError('Invalid file type! Only PNG, JPG, and JPEG are allowed.', 400));
      }
      return next(new HttpError(err.message, 400));
    }
    next();
  });
};

// GET all places
userRouter.get('/', usersController.getUsers);
userRouter.post(
  '/signup',
  handleFileUpload, // Use custom handler instead of direct multer middleware
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 8 }),
  ],
  usersController.signup
);
userRouter.post('/login', usersController.login);

export default userRouter;
