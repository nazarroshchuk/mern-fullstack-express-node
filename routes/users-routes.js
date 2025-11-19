import express from 'express';
import { usersController } from '../controllers/intex.js';
import { check } from 'express-validator';
import { handleFileUserUpload } from '../middleware/file-upload.js';

const userRouter = express.Router();

// GET all places
userRouter.get('/', usersController.getUsers);
// User signup and login routes
userRouter.post(
  '/signup',
  handleFileUserUpload, // Use custom handler instead of direct multer middleware
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 8 }),
  ],
  usersController.signup
);
// User login route
userRouter.post('/login', usersController.login);

export default userRouter;
