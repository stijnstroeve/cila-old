import passport from '../../auth/passport';
import {Middleware} from 'paper-wrapper';

export class AuthenticationMiddleware extends Middleware {
    handle(module, method, request) {
        return (req, res, next) => {
            passport.authenticate('local', { session: false }, (err, user) => {
                if(!user) {
                    request.error(null); // TODO: Send the right error
                } else {
                    req.user = user;
                    next();
                }
            })(req, res, next);
        };
    }
}
