import express from 'express';
import {Middleware, Module, ModuleMethod, ModuleRequest} from 'paper-wrapper';
import ResultError from '../HttpError';
import {IUser} from '../../Database/Models/User';
import Passport from '../../Auth/Passport';

// TODO: Maybe don't use this as Middleware?
export class AuthenticationMiddleware extends Middleware {
    handle(module: Module, method: ModuleMethod, request: ModuleRequest) {
        return (req: express.Request, res: express.Response, next: express.NextFunction) => {
            Passport.passport.authenticate('local', { session: false }, (err: Error, user: IUser) => {
                if(!user) {
                    // If the user was not found, return an unknown credentials Error
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
