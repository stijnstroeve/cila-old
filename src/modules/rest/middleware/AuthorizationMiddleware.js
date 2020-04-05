import passport from '../../auth/passport';
import {Middleware} from 'paper-wrapper';
import ResultError from '../error';

export class AuthorizationMiddleware extends Middleware {
    handle(module, method, request) {
        return (req, res, next) => {
            passport.authenticate('jwt', { session: false }, (err, user) => {
                if(!user) {
                    request.error(
                        ResultError('UNAUTHORIZED', err)
                    );
                } else {
                    req.user = user;
                    next();
                }
            })(req, res, next);
        };
    }
}
