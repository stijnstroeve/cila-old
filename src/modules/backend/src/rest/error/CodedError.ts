
class CodedError extends Error{
    public code: any;

    constructor(code: any, message: string) {
        super(message);

        this.code = code;
    }
}

export {CodedError};