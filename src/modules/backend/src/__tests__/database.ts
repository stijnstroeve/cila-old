import mongoose from 'mongoose';
import config from '../core/configurations/config.development.json';
import {expect} from 'chai';

/**
 * Clean all collections for a clean environment
 */
const clearCollections = () => {
    for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].remove(() => {});
    }
};

// Connect to db before __tests__ run
before((done) => {

    // Connect to mongodb
    mongoose.connect(config.mongodb_url);
    mongoose.connection.once('open', () => {
        // Drop the collections before each test
        clearCollections();

        done();
    }).on('error', (error) => {
        console.log('Connection error:', error);
    });

});

after((done) => {
    mongoose.disconnect();
    return done();
});

describe('Hello function', () => {
    it('should return hello world', () => {
        const result = 'Hello World!';
        expect(result).to.equal('Hello World!');
    });
});
