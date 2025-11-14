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

  const { name, email, password, places } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email }).exec();
    if (existingUser) {
      return next(new HttpError('User exists already, please login instead.', 422));
    }

    const newUser = new UserModel({
      name,
      email,
      password,
      image: 'https://picsum.photos/200/200',
      places: places || [],
    });
    await newUser.save();
    res.status(201).json({ user: newUser.toObject({ getters: true }) });
  } catch (e) {
    return next(e || new HttpError('Signing up failed, please try again later.', 500));
  }
};

export const login = async (req, res, next) => {
  getValidationExpressErrors(req, res, next);

  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user || user.password !== password) {
      return next(new HttpError('Invalid credentials, could not log you in.', 401));
    }

    return res.status(201).json({ user: user.toObject({ getters: true }) });
  } catch (e) {
    return next(e || new HttpError('Invalid credentials, could not log you in.', 500));
  }
};
