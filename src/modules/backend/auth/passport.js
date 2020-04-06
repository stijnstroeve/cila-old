import passport from 'src/modules/backend/auth/passport';
import LocalStrategy from 'passport-local';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import User from '../database/models/User';
import config from '../core/configurations/config';
import winstonLogger from '../logger/winston';

/**
 * Passport Local Strategy
 *
 * First retrieves email and password from the request body.
 * Then tries to find the user in the database by email.
 * If the user exists the password is matched.
 */
const localOptions = {
    usernameField: 'email',
    passwordField: 'password'
};

passport.use(new LocalStrategy(localOptions, (email, password, done) => {
    // Find the user in the database
    User.findOne({email: email}, (err, user) => {
        if (err) {
            winstonLogger.error(err);
            return done(null, false);
        }
        // Check if the given password was valid if the user exists
        if (user && user.validPassword(password)) {
            return done(null, user);
        }
        // The user does not exist or the password was not right
        return done(null, false);
    });
}));

/**
 * Passport JWT Strategy
 *
 * First retrieves the JWT token from the header as bearer token.
 * Then validates the jwt token and finds the user in the database.
 */
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt_secret
};

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    // Find the user in the database
    User.findOne({_id: jwtPayload.id}, (err, user) => {
        if (err) {
            winstonLogger.error(err);
            return done(null, false);
        }
        return done(null, user || false);
    });
}));

export default passport;