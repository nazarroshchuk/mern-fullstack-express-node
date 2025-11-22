import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import HttpError, { getValidationExpressErrors } from '../models/http-error.js';
import UserModel from '../models/user.js';

export const getUsers = async (req, res, next) => {
  getValidationExpressErrors(req, res, next);

  try {
    const users = await UserModel.find({}, '-password').exec();
    res.json({ users: users.map(user => user.toObject({ getters: true })) || [] });
  } catch (e) {
    next(e || new HttpError(e.message, 500));
  }
};

export const signup = async (req, res, next) => {
  getValidationExpressErrors(req, res, next);

  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const existingUser = await UserModel.findOne({ email }).exec();
    if (existingUser) {
      return next(new HttpError('User exists already, please login instead.', 422));
    }

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      image: req.file.path,
      places: [],
    });
    await newUser.save();

    const token = jwt.sign(
      {
        userId: newUser._id,
        email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.status(201).json({ userId: newUser._id, email, token });
  } catch (e) {
    return next(e || new HttpError('Signing up failed, please try again later.', 403));
  }
};

export const login = async (req, res, next) => {
  getValidationExpressErrors(req, res, next);

  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!user || !isValidPassword) {
      return next(new HttpError('Invalid credentials, could not log you in.', 403));
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(201).json({ userId: user._id, email, token });
  } catch (e) {
    return next(e || new HttpError('Invalid credentials, could not log you in.', 403));
  }
};
