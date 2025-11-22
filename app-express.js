import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import placesRoutes from './routes/places-routes.js';
import usersRoutes from './routes/users-routes.js';
import HttpError from './models/http-error.js';
import clientMongoose from './utils/mongoose.js';
import fs from 'fs';
dotenv.config();

const PORT = process.env.PORT || 4001; // Hiroku provides its own port via env variable after deployment
const BASE_URL = process.env.API_BASE_URL;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

const appExpress = express();

//CORS middleware
appExpress.use(cors({ origin: CORS_ORIGIN, credentials: true }));

appExpress.use((req, res, next) => {
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

// Middleware to parse JSON bodies
appExpress.use(bodyParser.json());

// Serve static files from the uploads/images directory
appExpress.use('/uploads/images', express.static('uploads/images'));
// Routes
appExpress.use(`${BASE_URL}/places`, placesRoutes);
appExpress.use(`${BASE_URL}/users`, usersRoutes);

// Handle unsupported routes
appExpress.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  next(error);
});

// Error handling middleware
appExpress.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occured!' });
});

// Start the server
const expressListener = () =>
  appExpress
    .listen(PORT, () => {
      console.log(`🚀 Express server running on http://localhost:${PORT}`);
    })
    .on('error', err => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Please try a different port.`);
        process.exit(1);
      } else {
        console.error('❌ Server error:', err);
        process.exit(1);
      }
    });

clientMongoose(expressListener);
