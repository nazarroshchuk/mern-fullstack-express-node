import jwt from 'jsonwebtoken';
import HttpError from '../models/http-error.js';

export const validateJwtToken = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(new HttpError('Authentication failed!', 401));
    }

    const token = authHeader.split(' ')[1];

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.userId, email: decodedToken.email };
    next();
  } catch (err) {
    next(new HttpError(err));
  }
};
