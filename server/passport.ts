import UserModel from "./models/User";
import {IUser} from "../interfaces";
const passport = require('passport');
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : process.env.SECRET_OR_KEY
    },
     (jwtPayload: any, done: any): Promise<{id: string}> => {
        return UserModel.findById(jwtPayload.id)
            .then(user =>
                {
                    done(null, user);
                }
            ).catch(err =>
            {
                return done(err);
            });
    }
))
