import express from 'express';
import passport from '../../auth/passport';
import {Middleware, Module, ModuleMethod, ModuleRequest} from 'paper-wrapper';
import ResultError from '../error';
import {IUser} from '../../database/models/User';

// TODO: Maybe don't use this as middleware?
export class AuthenticationMiddleware extends Middleware {
    handle(module: Module, method: ModuleMethod, request: ModuleRequest) {
        return (req: express.Request, res: express.Response, next: express.NextFunction) => {
            passport.authenticate('local', { session: false }, (err: Error, user: IUser) => {
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
