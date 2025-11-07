import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoDbUrl = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@cluster0.oohiw3o.mongodb.net/places_app?appName=Cluster0`;

const clientMongoose = onStartServer =>
  mongoose
    .connect(mongoDbUrl)
    .then(() => {
      console.log('Connected to MongoDB using Mongoose successfully');
      onStartServer();
    })
    .catch(error => {
      console.error('Error connecting to MongoDB using Mongoose:', error);
    });

export default clientMongoose;
