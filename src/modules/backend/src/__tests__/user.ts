import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import User from '../database/models/User';

// Setup rest api
import RestAPI from '../rest/index';
const rest = new RestAPI('development');

// Setup chai should
chai.use(chaiHttp);
const should = chai.should();

let fakeJWT = '';

// Tests
describe('User', () => {

    describe('POST /user/authenticate', () => {
        const userData = {
            username: 'username',
            email: faker.internet.email(),
            password: faker.internet.password()
        };
        const req = {
            email: userData.email,
            password: userData.password
        }

        before(async () => {
            // Create the demo user
            const user = new User({
                username: userData.username,
                email: userData.email
            });
            user.setPassword(userData.password);
            await user.save();
        });

        it('it should authenticate the user', (done) => {
            chai.request(rest.app)
                .post('/user/authenticate')
                .send(req)
                .end((err, res) => {

                    res.should.have.status(200);
                    res.body.success.should.be.true;
                    res.body.data.should.be.a('object');
                    res.body.data.token.should.be.a('string');

                    fakeJWT = res.body.data.token;

                    done();
                });
        });
    });


    describe('POST /user/users', () => {
        const req = {
            'username': 'demouser',
            'email': faker.internet.email().toLowerCase(),
            'password': faker.internet.password()
        };

        it('it should create a user', (done) => {
            chai.request(rest.app)
                .post('/user/users')
                .set('Authorization', 'Bearer ' + fakeJWT)
                .send(req)
                .end((err, res) => {

                    // Make sure the request is success
                    res.should.have.status(200);
                    res.body.success.should.be.true;

                    done();
                });
        });

        it('it should have create a user in database', async () => {
            const user = await User.findOne({ username: req.username });

            user.should.not.be.null;
            user.username.should.equal(req.username);
            user.email.should.equal(req.email);
        });

    });
});
