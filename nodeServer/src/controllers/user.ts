import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

import User from '../db/models/user';

const SECRET_KEY = process.env.JWT_SECRET
export const signUp = async (req: Request, res: Response) => {
    const { email, password, nickname } = req.body;
    console.log(req.body);
    try {
        // const user1 = new User({email,password,nickname});
        const user = await User.create(req.body);
        console.log(location);
        return res.status(201).json({message : `signup success with email : ${user.email}`});
    } catch (e) {
        console.log(`signup error with ${e}`);
        return res.status(409).json(e);
    }
};

export const login = async (req: Request, res: Response, next: Function) => {
    const accessToken = jwt.sign(
        {email:req.body.email},
        "OVWdXG1Sz7",
        {expiresIn: "7d"});
    res.status(200).json({message: 'login success', accessToken});
    return next();
};

export const testJWT = async (req: Request, res: Response, next: Function) => {
    console.log(req);
    return res.status(200).json({messsage:`token test success!`});
}
