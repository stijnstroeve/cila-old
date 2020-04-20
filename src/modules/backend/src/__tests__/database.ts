import mongoose from 'mongoose';
import config from '../../configurations/config.tests.json';
import User from '../Database/Models/User';
import faker from 'faker';
import DemoUser from './models/DemoUser';
import Core from '../Core/Core';
import Application from '../Core/Core';

/**
 * Clean all collections for a clean environment
 */
const clearCollections = () => {
    for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].remove(() => {});
    }
};

const createDemoUser = async () => {
    const userData: any = {
        username: 'demouser',
        email: faker.internet.email(),
        password: faker.internet.password()
    };

    // Create the demo user
    const user = new User({
        username: userData.username,
        email: userData.email
    });

    user.setPassword(userData.password);
    await user.save();

    // Set the demo user data
    DemoUser.getInstance().username = userData.username;
    DemoUser.getInstance().email = userData.email;
    DemoUser.getInstance().password = userData.password;
    DemoUser.getInstance().jwt = user.generateJWT();

};

// Connect to db before __tests__ run
before((done) => {
    const core = new Core('./configurations/config.tests.json');

    core.start().then(() => {
        // Connect to mongodb
        mongoose.connect(config.mongodb_url);
        mongoose.connection.once('open', async () => {
            // Drop the collections before each test
            clearCollections();

            // Create the demo user for the tests
            await createDemoUser();

            done();
        }).on('error', (error) => {
            console.log('Connection Error:', error);
        });
    })
});

after((done) => {
    mongoose.disconnect();
    return done();
});