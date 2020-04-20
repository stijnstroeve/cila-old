import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import User from '../Database/Models/User';
import DemoUser from './models/DemoUser';

// Setup Http api
import RestAPI from '../Http/RestAPI';
const rest = new RestAPI('development');

// Setup chai
chai.use(chaiHttp);

// Tests
describe('User', () => {

    describe('POST /user/authenticate', () => {

        it('it should authenticate the user', (done) => {
            const req = {
                email: DemoUser.getInstance().email,
                password: DemoUser.getInstance().password
            }

            chai.request(rest.app)
                .post('/user/authenticate')
                .send(req)
                .end((err, res) => {

                    expect(res).to.have.status(200);
                    expect(res.body.success).to.be.true;
                    expect(res.body.data).to.be.a('object');
                    expect(res.body.data.token).to.be.a('string');

                    done();
                });
        });
    });

    let createdUserId: string = '';

    describe('POST /user/users', () => {
        const req = {
            'username': 'testuser',
            'email': faker.internet.email().toLowerCase(),
            'password': faker.internet.password()
        };

        it('it should create a user', (done) => {

            chai.request(rest.app)
                .post('/user/users')
                .set('Authorization', 'Bearer ' + DemoUser.getInstance().jwt)
                .send(req)
                .end((err, res) => {

                    // Make sure the request is success
                    expect(res).to.have.status(200);
                    expect(res.body.success).to.be.true;

                    createdUserId = res.body.data.id;

                    done();
                });
        });

        it('it should have create a user in database', async () => {
            const user = await User.findOne({ username: req.username });

            expect(user).to.exist;
            expect(user.username).to.equal(req.username);
            expect(user.email).to.equal(req.email);
        });

    });

    describe('DELETE /user/users', () => {

        it('it should delete a user', (done) => {
            const req = {
                id: createdUserId
            };

            chai.request(rest.app)
                .delete('/user/users')
                .set('Authorization', 'Bearer ' + DemoUser.getInstance().jwt)
                .send(req)
                .end((err, res) => {

                    // Make sure the request is success
                    expect(res).to.have.status(200);
                    expect(res.body.success).to.be.true;

                    done();
                });
        });

        it('it should have disabled a user in database', async () => {
            const user = await User.findOne({ _id: createdUserId });

            expect(user).to.exist;
            expect(user.disabled).to.be.true;
        });

    });
});
