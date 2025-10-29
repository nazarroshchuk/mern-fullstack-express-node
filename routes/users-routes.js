import express from "express";

import { usersController } from "../controllers/intex.js";

const userRouter = express.Router();

// GET all places
userRouter.get("/", usersController.getUsers);
userRouter.post('/signup', usersController.signup);
userRouter.post('/login', usersController.login);

export default userRouter;
