import passport from 'passport';
import {
    Strategy as JWTStrategy,
    ExtractJwt,
} from 'passport-jwt';
import passportLocal from 'passport-local';
import {UserModel} from "../db";


const localOpts = {
    usernameField: 'email',
};

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "OVWdXG1Sz7",
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
        // console.log(user?._id);
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
