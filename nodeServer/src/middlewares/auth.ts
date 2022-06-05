import passport from 'passport';
import {
    Strategy as JWTStrategy,
    ExtractJwt,
} from 'passport-jwt';
import passportLocal from 'passport-local';
import {UserModel} from "../db";
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

const localOpts = {
    usernameField: 'email',
};

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : JWT_SECRET
};

const LocalStrategy = passportLocal.Strategy;

const localStrategy = new LocalStrategy(localOpts, async (email, password, done) => {
    try {
        const user = await UserModel.findOne({
            email,
        });
        if (!user) {
            return done(null, false);
        } else if (!user.comparePassword(password)) {
            return done(null, false);
        }
        return done(null, user);
    } catch (e) {
        return done(e, false);
    }
});

const jwtStrategy = new JWTStrategy(jwtOpts, async (payload,done) => {
    console.log(payload);
    try{
        const user = await UserModel.findOne({email : payload.email});
        if(!user) {
            return done(null, false);
        }
        return done(null,user);
    }
    catch(e){
        return done(e,false);
    }
})

passport.use(localStrategy);
passport.use(jwtStrategy);

export const authLocal = passport.authenticate('local',{
    session: false,
});

export const authJwt = passport.authenticate('jwt',{
    session: false,
})
