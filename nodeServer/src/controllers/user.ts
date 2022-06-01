import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();
import { UserModel } from '../db';

const SECRET_KEY = process.env.JWT_SECRET
export const signUp = async (req: Request, res: Response) => {
    const { email, password, nickname } = req.body;
    console.log(req.body);
    try {
        const user = new UserModel(req.body)
        console.log(user);
        await user.save({ validateBeforeSave: false });
        return res.status(201).json(
            {
                message : `signup success with email : ${user.email}`,
            }
        );
    } catch (e) {
        console.log(`signup error with ${e}`);
        return res.status(403).json({
            errormessage: `${e}`
        });
    }
};

export const login = async (req: Request, res: Response) => {
    const accessToken = jwt.sign(
        {email:req.body.email},
        "OVWdXG1Sz7",
        {expiresIn: "30d"});
    return res.status(200).json({message: 'login success', accessToken});
};

export const testJWT = async (req: Request, res: Response) => {
    try{
        const user = await UserModel.findOne({email : req.body.email});
        console.log(user);
        return res.status(200).json({message: `test success!`});
    }
    catch (e) {
        console.log(`test error with ${e}`)
        return res.status(403).json(e);
    }
}
