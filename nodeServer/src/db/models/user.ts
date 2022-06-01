import { hashSync, compareSync, genSaltSync } from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import mongoose, { Document, model, Schema, Types } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import validator from 'validator';

import { passwordReg } from '../../middlewares/validation';
import { MyPlantDocument } from "./myplant";

type ComparePasswordFunction = (candidatePassword: string) => Boolean;

dotenv.config();

export type User = {
    userId: string;
    email: string;
    password: string;
    nickname: string;
    admin: boolean;
    jsonWebToken: string;
    comparePassword: ComparePasswordFunction;
    myPlantList: MyPlantDocument[];
};
export const userSchema = new Schema(
    {
        userId: {
            type: String,
            // required: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required!'],
            // unique: true,
            trim: true,
            validate: {
                validator(email: string) {
                    return validator.isEmail(email);
                },
                message: '{value} is not a valid email!',
            },
        },
        nickname: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required!'],
            trim: true,
            validate: {
                validator(password: string) {
                    return passwordReg.test(password);
                },
                message: '{VALUE} is not a valid password!',
            },
        },
        jsonWebToken: String,
        admin: { type: Boolean, default: false },
        myPlantList:[
            {
                type: Schema.Types.ObjectId,
                ref: 'myPlant'
            }
        ]
    },
    {
        timestamps: true,
    },
);

userSchema.plugin(mongooseUniqueValidator, {
    message: '{VALUE} already taken',
});

userSchema.pre('save', function (next) {
    console.log(`save method called!`);
    if (this.isModified('password')) {
        this.password = this._hashPassword(this.password);
    }
    return next();
});

const saltRounds = 10;

userSchema.methods._hashPassword = function (password: string) {
    return hashSync(password, genSaltSync(saltRounds));
};
userSchema.methods.comparePassword = function (password: string) {
    return compareSync(password, this.password);
};
userSchema.methods.createToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        'MyJWTSecretKey',
    );
};
userSchema.methods.toJson = function () {
    return {
        _id: this._id,
        email: this.email,
        token: `JWT ${this.createToken()}`,
    };
};

interface UserBaseDocument extends User, Document {}

export interface UserDocument extends UserBaseDocument {}

export const UserModel = mongoose.model<UserDocument>('User', userSchema);
