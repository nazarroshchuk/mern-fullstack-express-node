import { v4 as uuidv4 } from 'uuid';

import HttpError from "../models/http-error.js";
import {validationResult} from "express-validator";

// Sample data for places
const users = [
    {id: 'u1', name: 'John Doe', email: "jon@mail.com", password: 'password123'},
    {id: 'u2', name: 'Jane Smith', email: "jane@mail.com", password: 'password123123'}
];

export const getUsers = (req, res, next) => {
    res.json({users});
}

export const signup = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        res.status(400).json({errors: errors.array()});
        return next(new HttpError('Invalid inputs passed, please check your data.', 422));
    }

    const {name, email, password} = req.body;

    if (users.find(user => user.name === name && user.email === email)) {
        throw new HttpError("User exists already, please login instead.", 422)
    }

    const newUser = {id: uuidv4(), name, email, password};
    users.push(newUser);
    res.status(201).json({user: newUser});
}

export const login = (req, res, next) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user || user.password !== password) {
        throw new HttpError("Invalid credentials", 401);
    }

    return res.status(201).json({user});
}