import passport from 'passport';
import LocalStrategy from 'passport-local';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import User from '../database/models/User';

const localOptions = {
    usernameField: 'email',
    passwordField: 'password'
};

passport.use(new LocalStrategy(localOptions, (email, password, done) => {
    console.log('wut 2');
    User.findOne({email: email}, (err, user) => {
        if (err) {
            // TODO: Log error somewhere
            return done(null, false);
        }
        if (user && user.validPassword(password)) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'gfgkgfnbjbfg' // TODO Configuration secret
};

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    User.findOne({_id: jwtPayload.id}, (err, user) => {
        if (err) {
            // TODO: Log error somewhere
            return done(null, false);
        }
        return done(null, user || false);
    });
}));

export default passport;