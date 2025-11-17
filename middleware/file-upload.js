import multer from 'multer';
import { v4 as uuidV4 } from 'uuid';

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
};

const fileUpload = multer({
  limits: { fileSize: 1000000 }, // 1MB limit
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
    let error = isValid
      ? null
      : new Error('Invalid file type! Only PNG, JPG, and JPEG are allowed.');
    cb(error, isValid);
  },
});

export default fileUpload;
