import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
import { UserModel } from '../db';
import mongoose from "mongoose";
import User from "../routes/user/user";

const SECRET_KEY = process.env.JWT_SECRET
export const signUp = async (req: Request, res: Response) => {
    const { email, password, nickname } = req.body;
    console.log(req.body);
    try {
        // const user1 = new User({email,password,nickname});
        // const user = await User.create(req.body);
        // const user = await UserModel.create({
        //     // _id: new mongoose.Types.ObjectId(),
        //     email: req.body.email,
        //     password: req.body.password,
        //     nickname: req.body.nickname
        // });
        const user = new UserModel(req.body)
        await user.save();
        return res.status(201).json(
            {
                message : `signup success with email : ${user.email}`,
                // user: user,
            }
        );
    } catch (e) {
        console.log(`signup error with ${e}`);
        return res.status(409).json(e);
    }
};

export const login = async (req: Request, res: Response, next: Function) => {
    const accessToken = jwt.sign(
        {email:req.body.email},
        "OVWdXG1Sz7",
        {expiresIn: "30d"});
    res.status(200).json({message: 'login success', accessToken});
    return next();
};

export const testJWT = async (req: Request, res: Response) => {
    try{
        const user = await UserModel.findOne({email : req.body.email});
        console.log(user);
        return res.status(200).json({message: `test success!`});
            // .json({message: `test success`, user: `${user}`});
    }
    // // console.log(req.user);
    // // const user = JSON.stringify(req.user);
    // // const list = user.split(',')[1].split(':')[1].slice(1,-1);
    // // console.log(list);
    catch (e) {
        console.log(`test error with ${e}`)
        res.status(409).json(e);
    }
    // return res.status(200).json({user:user});
    // return res.status(200).json({messsage:`token test success!`});
}
