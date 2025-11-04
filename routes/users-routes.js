import express from 'express';

import { usersController } from '../controllers/intex.js';
import { check } from 'express-validator';

const userRouter = express.Router();

// GET all places
userRouter.get('/', usersController.getUsers);
userRouter.post(
  '/signup',
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 8 }),
  ],
  usersController.signup
);
userRouter.post('/login', usersController.login);

export default userRouter;
