import { v4 as uuidv4 } from 'uuid';

// Sample data for places
import HttpError from "../models/http-error.js";

const users = [
    {id: 'u1', name: 'John Doe', email: "jon@mail.com", password: 'password123'},
    {id: 'u2', name: 'Jane Smith', email: "jane@mail.com", password: 'password123123'}
];

export const getUsers = (req, res, next) => {
    res.json({users});
}

export const signup = (req, res, next) => {
    const {name, email, password} = req.body;
    const newUser = {id: uuidv4(), name, email, password};
    users.push(newUser);
    res.status(201).json({user: newUser});
}

export const login = (req, res, next) => {
    const { email, password } = req.body;
    const user = users.find(u => u.name === name);
    if (user) {
        res.json({message: 'Login successful', user});
    } else {
        res.status(401).json(new HttpError("Invalid credentials", 401));
    }
}