import passport from '../../auth/passport';
import {Middleware} from 'paper-wrapper';
import ResultError from '../error';

export class AuthenticationMiddleware extends Middleware {
    handle(module, method, request) {
        return (req, res, next) => {
            passport.authenticate('local', { session: false }, (err, user) => {
                if(!user) {
                    // If the user was not found, return an unknown credentials error
                    request.error(
                        ResultError('UNKNOWN_CREDENTIALS', err)
                    );
                } else {
                    req.user = user;
                    next();
                }
            })(req, res, next);
        };
    }
}
