import { validationResult } from 'express-validator';

class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const getValidationExpressErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(400).json({ errors: errors.array() });
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }
};

export default HttpError;
