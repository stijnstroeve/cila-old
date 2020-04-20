import passport from 'passport';
import LocalStrategy from 'passport-local';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import User from '../Database/Models/User';
import Configuration from '../Core/Configuration';
import WinstonLogger from '../Logging/WinstonLogger';

class Passport {
    public static passport: passport.PassportStatic = passport;

    public static register(): void {
        Passport.registerJWTStrategy();
        Passport.registerLocalStrategy();
    }

    /**
     * Passport JWT Strategy
     *
     * First retrieves the JWT token from the header as bearer token.
     * Then validates the jwt token and finds the user in the database.
     */
    private static registerJWTStrategy(): void {
        const options = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: Configuration.getInstance().values.jwt_secret
        };

        this.passport.use(new JwtStrategy(options, (jwtPayload, done) => {

            // Find the user in the database
            User.findOne({_id: jwtPayload.id}, (err, user) => {
                if (err) {
                    WinstonLogger.getWinstonLogger().error(err);
                    return done(null, false);
                }
                return done(null, user || false);
            });
        }));
    }

    /**
     * Passport Local Strategy
     *
     * First retrieves email and password from the request body.
     * Then tries to find the user in the database by email.
     * If the user exists the password is matched.
     */
    private static registerLocalStrategy(): void {
        const options = {
            usernameField: 'email',
            passwordField: 'password'
        };

        // @ts-ignore
        this.passport.use(new LocalStrategy(options, (email, password, done) => {
            // Find the user in the database
            User.findOne({email: email}, (err, user) => {
                if (err) {
                    WinstonLogger.getWinstonLogger().error(err);
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

    }

}

export default Passport;