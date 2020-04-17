import {Middleware, RequestType} from 'paper-wrapper';
import {IParameter} from 'paper-wrapper/lib/requests/parameter';

interface ICRUDMethodData {
    request: string;
    middleware: Array<Middleware>;
    optionalParameters: Array<IParameter>;
    requiredParameters: Array<IParameter>;
    handle?: Function;
}

abstract class CRUDMethods {
    public abstract create: ICRUDMethodData;
    public abstract read?: ICRUDMethodData;
    public abstract update?: ICRUDMethodData;
    public abstract delete?: ICRUDMethodData;

    public abstract createMethod: Function;
    public abstract readMethod?: Function;
    public abstract updateMethod?: Function;
    public abstract deleteMethod?: Function;

    /**
     * Makes sure the paper method is valid
     * @param method The method to validate
     * @returns {boolean}
     * @private
     */
    private static validateMethod(method: any) {
        if(!method.request) {
            throw new Error('Method request not defined');
        } else if(!method.handle) {
            throw new Error('Method \' handle method not defined');
        }
        return true;
    }

    /**
     * Adds missing data to the given method
     * This missing data is required by paper-wrapper but is easier to not require on CRUD methods
     * to make sure the method is as compact as possible
     * @param method Method to add data to
     * @private
     */
    private static completeMethod(method: any) {
        // Make sure the middleware field exists on the method
        if(!('middleware' in method)) {
            method['middleware'] = [];
        }
        // Make sure the requiredParameters field exists on the method
        if(!('requiredParameters' in method)) {
            method['requiredParameters'] = [];
        }
        // Make sure the optionalParameters field exists on the method
        if(!('optionalParameters' in method)) {
            method['optionalParameters'] = [];
        }
        return method;
    }

    /**
     *
     * @param method
     * @param requestType
     * @returns {method}
     * @private
     */
    private static parseMethod(method: any, requestType: RequestType) {
        // Crashes the app when not valid
        CRUDMethods.validateMethod(method);

        method = CRUDMethods.completeMethod(method);
        method['requestType'] = requestType;
        return method;
    }

    public getMethods() {
        const methods = [];

        if(this.create !== undefined) {
            this.create.handle = this.createMethod;
            methods.push(
                CRUDMethods.parseMethod(this.create, RequestType.POST)
            );
        }
        if(this.read !== undefined) {
            this.read.handle = this.readMethod;
            methods.push(
                CRUDMethods.parseMethod(this.read, RequestType.GET)
            );
        }
        if(this.update !== undefined) {
            this.update.handle = this.updateMethod;
            methods.push(
                CRUDMethods.parseMethod(this.update, RequestType.PUT)
            );
        }
        if(this.delete !== undefined) {
            this.delete.handle = this.deleteMethod;
            methods.push(
                CRUDMethods.parseMethod(this.delete, RequestType.DELETE)
            );
        }
        return methods;
    }
}

export default CRUDMethods;
export {ICRUDMethodData};