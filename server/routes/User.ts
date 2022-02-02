import {Request, Response} from 'express';
import StatusCodes from 'http-status-codes';
import {IUser} from "../../interfaces";
import user from "../User";
import UserModel from "../models/User";
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {BAD_REQUEST, CREATED, OK} = StatusCodes;
require('dotenv').config()
const secret = process.env.SECRET_OR_KEY

const signup = async (req: Request, res: Response) => {
    try {
        try {
            const newUser = new UserModel({...req.body});
            await newUser.save();
        } catch (e) {
            return res.status(400).json(e);
        }
        return res.status(200).json({});
    } catch (e) {
        return res.status(200).json({});
    }
}

const login = async (req: Request, res: Response) => {

    const errors = {
        message: ""
    };
    const username = req.body.username
    const password = req.body.password;
    const user = await UserModel.findOne({ username }).select("+password");

    // return if there was no user with this username found in the database
    if (!user) {
        errors.message = "No Account Found";
        return res.status(400).json(errors);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // return 400 if password does not match
    if (!isMatch) {
        errors.message = "Password is incorrect";
        return res.status(400).json(errors);
    }

    const payload = {
        id: user._id,
        username: user.username
    };

    const token = await jwt.sign(payload, secret, { expiresIn: 36000 });

    if (!token) {
        return res.status(500)
            .json({ error: "Error signing token"});
    }

    return res.json({
        success: true,
        token: `Bearer ${token}` });
}

const me = async (data: any, res: Response) => {
    const userData: IUser | null = await user.getByUsername(data.user.username)
    res.status(200).json(userData)
}

const getUsers = async (req: Request, res: Response) => {
    const users: IUser[] = await user.get()
    res.status(OK).json(users);
}


export {getUsers, signup, login, me}
