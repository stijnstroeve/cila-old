import express from 'express';
import {Middleware, Module, ModuleMethod, ModuleRequest} from 'paper-wrapper';
import ResultError from '../HttpError';
import {IUser} from '../../Database/Models/User';
import Passport from '../../Auth/Passport';

export class AuthorizationMiddleware extends Middleware {
    handle(module: Module, method: ModuleMethod, request: ModuleRequest) {
        return (req: express.Request, res: express.Response, next: express.NextFunction) => {
            Passport.passport.authenticate('jwt', { session: false }, (err: Error, user: IUser) => {
                if(!user) {
                    // If the user was not found, return an unauthorized Error
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
