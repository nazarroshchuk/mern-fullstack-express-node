import PlaceModel from '../models/place.js';
import HttpError, { getValidationExpressErrors } from '../models/http-error.js';
import { getCoordsForAddress } from '../utils/location.js';
import mongoose from 'mongoose';
import UserModel from '../models/user.js';
import fs from 'fs';

export const getPlaceById = async (req, res, next) => {
  const id = req.params.pid;

  try {
    const place = await PlaceModel.findById(id).exec();

    if (!place) {
      return next(new HttpError('Could not find a place for the provided id.', 404));
    }

    res.json({ place: place.toObject({ getters: true }) });
  } catch (e) {
    return next(e || new HttpError('Fetching place failed, please try again later.', 500));
  }
};

export const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  try {
    const places = await PlaceModel.find({ creator: userId }).exec();

    if (places) {
      res.json({ places: places.map(place => place.toObject({ getters: true })) || [] });
    } else {
      next(new HttpError('Places not found for this user.', 404));
    }
  } catch (e) {
    return next(e || new HttpError('Fetching places failed, please try again later.', 500));
  }
};

export const createPlace = async (req, res, next) => {
  getValidationExpressErrors(req, res, next);

  const { title, description, address, creator } = req.body;
  let location;

  try {
    location = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  try {
    const newPlace = new PlaceModel({
      title,
      description,
      location,
      address,
      creator,
      image: req.file.path,
    });

    const user = await UserModel.findById(creator);
    if (!user) {
      return next(new HttpError('Could not find user for provided id.', 404));
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    await newPlace.save({ session });
    user.places.push(newPlace);
    await user.save({ session });

    await session.commitTransaction();

    res.status(201).json({ newPlace });
  } catch (e) {
    return next(e || new HttpError('Creating place failed, please try again.', 500));
  }
};

export const updatePlace = async (req, res, next) => {
  getValidationExpressErrors(req, res, next);

  const { title, description } = req.body;
  const placeId = req.params.pid;

  if (!mongoose.Types.ObjectId.isValid(placeId)) {
    return next(new HttpError('Invalid place ID format.', 400));
  }

  try {
    const place = await PlaceModel.findById(placeId);
    const previousImage = place.image;
    if (!place) {
      return next(new HttpError('Could not find a place for the provided id.', 404));
    }
    place.title = title;
    place.description = description;
    place.image = req.file.path;

    await place.save();

    fs.unlink(previousImage, err => {
      console.log(err);
    });
    res.status(200).json({ place: place.toObject({ getters: true }) });
  } catch (e) {
    return next(e || new HttpError('Something went wrong, could not update place.', 500));
  }
};

export const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();

    const place = await PlaceModel.findById(placeId).populate('creator');

    const imagePath = place.image;

    if (!place) {
      return next(new HttpError(`Could not find a place for the provided id: ${placeId}.`, 404));
    }

    place.creator.places.pull(place);
    await place.creator.save({ session });

    await PlaceModel.deleteOne({ _id: placeId }, { session });

    await session.commitTransaction();

    fs.unlink(imagePath, err => {
      console.log(err);
    });

    res.status(200).json({ message: 'Deleted place.' });
  } catch (e) {
    return next(e || new HttpError('Something went wrong, could not delete place.', 500));
  }
};
