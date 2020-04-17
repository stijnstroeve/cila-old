import express from 'express';
import passport from '../../auth/passport';
import {Middleware, Module, ModuleMethod, ModuleRequest} from 'paper-wrapper';
import ResultError from '../error';
import {IUser} from '../../database/models/User';

export class AuthorizationMiddleware extends Middleware {
    handle(module: Module, method: ModuleMethod, request: ModuleRequest) {
        return (req: express.Request, res: express.Response, next: express.NextFunction) => {
            passport.authenticate('jwt', { session: false }, (err: Error, user: IUser) => {
                if(!user) {
                    // If the user was not found, return an unauthorized error
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
