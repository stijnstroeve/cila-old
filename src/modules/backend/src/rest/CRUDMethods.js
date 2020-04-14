import {RequestType} from 'paper-wrapper';

export class CRUDMethods {
    /**
     * Makes sure the paper method is valid
     * @param method The method to validate
     * @returns {boolean}
     * @private
     */
    _validateMethod(method) {
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
    _completeMethod(method) {
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
     * @returns {CRUDMethods._completeMethod.props|*}
     * @private
     */
    _parseMethod(method, requestType) {
        this._validateMethod(method);

        method = this._completeMethod(method);
        method['requestType'] = requestType;
        return method;
    }

    getMethods() {
        const methods = [];

        if(this.create !== undefined) {
            methods.push(
                this._parseMethod(this.create, RequestType.POST)
            );
        }
        if(this.read !== undefined) {
            methods.push(
                this._parseMethod(this.read, RequestType.GET)
            );
        }
        if(this.update !== undefined) {
            methods.push(
                this._parseMethod(this.update, RequestType.PUT)
            );
        }
        if(this.delete !== undefined) {
            methods.push(
                this._parseMethod(this.delete, RequestType.DELETE)
            );
        }
        return methods;
    }
}