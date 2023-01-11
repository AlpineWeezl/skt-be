// import pkg from 'joi';
// const { object, string } = pkg;

import { User } from "../models/User.js";

// ------------------------------------ double email check ------------------------------------------------
/**
 * This function checks, if the desired username is already taken
 * @param {*} req Request 
 * @param {*} res Response
 * @param {*} next Next function in router chain
 */
export const doubleEmailUsernameCheck = (req, res, next) => {
    const { email, username } = req.body.user;
    const existingEmail = User.find({ email: email });
    console.log(existingEmail);
    const existingUsername = User.findOne({ username: username });
    if (existingEmail && existingEmail.email !== email) {
        console.log('email exists');
        res.status(400).json({ message: "user cannot be created!" });
    } else if (existingUsername && existingEmail.email !== email) {
        console.log('username exists');
        res.status(400).json({ message: "user cannot be created!" });
    } else {
        next();
    }
}