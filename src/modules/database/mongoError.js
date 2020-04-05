import {MONGODB_DUPLICATION_KEY, MONGODB_OTHER_KEY} from './constants';

const getMongoError = ((mongodbError) => {
    if(mongodbError.name === 'MongoError') {
        switch(mongodbError.code) {
            case 11000:
                return MONGODB_DUPLICATION_KEY;
            default:
                return MONGODB_OTHER_KEY;
        }
    }
    return MONGODB_OTHER_KEY;
});

export {getMongoError};