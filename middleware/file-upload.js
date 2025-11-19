import multer from 'multer';
import { v4 as uuidV4 } from 'uuid';
import HttpError from '../models/http-error.js';

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/webp': 'webp',
};

export const fileUserImageUpload = multer({
  limits: { fileSize: 500000 }, // 500 KB limit
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
      const extname = MIME_TYPE_MAP[file.mimetype];
      cb(null, `${uuidV4()}.${extname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    const error = isValid
      ? null
      : new Error('Invalid file type! Only PNG, JPG, and JPEG are allowed.');
    cb(error, isValid);
  },
});

export const filePlaceImageUpload = multer({
  limits: { fileSize: 1000000 }, // 1 MB limit
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/images');
    },
    filename: (req, file, cb) => {
      const extname = MIME_TYPE_MAP[file.mimetype];
      cb(null, `${uuidV4()}.${extname}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    const error = isValid
      ? null
      : new Error('Invalid file type! Only PNG, JPG, and JPEG are allowed.');
    cb(error, isValid);
  },
});

// Middleware to handle multer errors
export const handleFileUserUpload = (req, res, next) => {
  fileUserImageUpload.single('image')(req, res, err => {
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

// Middleware to handle multer errors
export const handleFilePlaceUpload = (req, res, next) => {
  filePlaceImageUpload.single('image')(req, res, err => {
    if (err) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return next(new HttpError('File too large. Maximum size is 1Mb.', 400));
      }
      if (err.message.includes('Invalid file type')) {
        return next(new HttpError('Invalid file type! Only PNG, JPG, and JPEG are allowed.', 400));
      }
      return next(new HttpError(err.message, 400));
    }
    next();
  });
};
