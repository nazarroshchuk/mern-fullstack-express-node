import HttpError from '../models/http-error.js';
import { v4 as uuidv4 } from 'uuid';
import { validationResult } from 'express-validator';
import { getCoordsForAddress } from '../utils/location.js';

// Sample data for places
const places = [
  {
    id: 'p1',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: '20 W 34th St, New York, NY 10001',
    creator: 'u1',
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: '20 W 34th St, New York, NY 10001',
    creator: 'u1',
  },
];

export const getPlaceById = (req, res, next) => {
  const id = req.params.pid;
  console.log('GET /api/places called with id:', id);
  const place = places.find(p => p.id === id);

  if (!place) {
    return next(new HttpError('Could not find a place for the provided id.', 404));
  }

  res.json({ place });
};

export const getPlacesByUserId = (req, res, next) => {
  const id = req.params.uid;
  console.log('GET /api/places called with id:', id);
  const userPlaces = places.filter(p => p.creator === id);
  if (userPlaces.length > 0) {
    res.json({ places: userPlaces });
  } else {
    next(new HttpError('Places not found for this user.', 404));
  }
};

export const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(400).json({ errors: errors.array() });
    next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }
  const { title, description, address, creator } = req.body;
  let location;

  try {
    location = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location,
    address,
    creator,
  };

  try {
    places.push(createdPlace);

    res.status(201).json({ place: createdPlace });
  } catch (e) {
    res.status(400).json(new HttpError(e.message, 400));
  }
};

export const updatePlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    res.status(400).json({ errors: errors.array() });
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  const placeIndex = places.findIndex(p => p.id === placeId);

  if (placeIndex === -1) {
    return next(new HttpError('Could not find a place for the provided id.', 404));
  }

  places[placeIndex] = {
    ...places[placeIndex],
    title,
    description,
  };

  res.status(200).json({ place: places[placeIndex] });
};

export const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;

  const placeIndex = places.findIndex(p => p.id === placeId);
  if (placeIndex === -1) {
    return next(new HttpError('Could not find a place for the provided id.', 404));
  }

  places.splice(placeIndex, 1);

  res.status(200).json({ message: 'Deleted place.', place: places[placeIndex] });
};
