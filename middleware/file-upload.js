import multer from 'multer';
import { v4 as uuidV4 } from 'uuid';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import HttpError from '../models/http-error.js';

const cloudinaryV2 = cloudinary.v2;

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/webp': 'webp',
};

// Configure Cloudinary
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  params: {
    folder: 'places-images', // folder name in Cloudinary
    allowed_formats: ['jpeg', 'jpg', 'png', 'webp'],
    name: (req, file) => `${uuidV4()}.${MIME_TYPE_MAP[file.mimetype]}`,
  },
});

export const fileUserImageUpload = multer({
  limits: { fileSize: 500000 }, // 500 KB limit
  storage: storage,
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
  storage: storage,
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
