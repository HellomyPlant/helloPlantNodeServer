import { Joi } from 'express-validation';

export const passwordReg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
export const signupValidation = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().regex(passwordReg).required(),
        nickName: Joi.string().required(),
        // lastName: Joi.string().required(),
        // userName: Joi.string().required(),
    }),
};
