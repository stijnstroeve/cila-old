import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import File from '../database/models/File';
import DemoUser from './models/DemoUser';
import fs from 'fs';

// Setup rest api
import RestAPI from '../rest/index';
const rest = new RestAPI('development');

// Setup chai
chai.use(chaiHttp);

// Tests
describe('File', () => {

    describe('POST /file/file-upload', () => {

        let createdFileData: any = null;

        it('it should upload the image file', (done) => {

            chai.request(rest.app)
                .post('/file/upload-file')
                .attach('files', fs.readFileSync('src/__tests__/data/image_file.png'), 'image_file.png')
                .set('Authorization', 'Bearer ' + DemoUser.getInstance().jwt)
                .end((err, res) => {

                    expect(res).to.have.status(200);
                    expect(res.body.success).to.be.true;
                    expect(res.body.data).to.be.a('array');
                    expect(res.body.data).to.have.lengthOf(1);
                    expect(res.body.data[0].mimeType).to.contain('image/');
                    expect(res.body.data[0].hashType).to.be.equal('md5');

                    createdFileData = res.body.data[0];

                    done();
                });
        });

        it('it should have create the image file in database', async () => {
            const file = await File.findOne({ _id: createdFileData.id });

            expect(file).to.exist;
            expect(file.mimeType).to.be.equal(createdFileData.mimeType);
            expect(file.hashType).to.be.equal(createdFileData.hashType);
            expect(file.hash).to.be.equal(createdFileData.hash);

            // @ts-ignore
            const hash = await file.calculateHash({path: './' + createdFileData.downloadUrl});
            expect(file.hash).to.be.equal(hash);
        });

        it('the upload file should be accessible', (done) => {

            chai.request(rest.app)
                .get(createdFileData.downloadUrl)
                .end((err, res) => {

                    expect(res).to.have.status(200);

                    done();
                });
        });
    });

    // let createdUserId: string = '';
    //
    // describe('POST /user/users', () => {
    //     const req = {
    //         'username': 'testuser',
    //         'email': faker.internet.email().toLowerCase(),
    //         'password': faker.internet.password()
    //     };
    //
    //     it('it should create a user', (done) => {
    //
    //         chai.request(rest.app)
    //             .post('/user/users')
    //             .set('Authorization', 'Bearer ' + DemoUser.getInstance().jwt)
    //             .send(req)
    //             .end((err, res) => {
    //
    //                 // Make sure the request is success
    //                 res.should.have.status(200);
    //                 res.body.success.should.be.true;
    //
    //                 createdUserId = res.body.data.id;
    //
    //                 done();
    //             });
    //     });
    //
    //     it('it should have create a user in database', async () => {
    //         const user = await User.findOne({ username: req.username });
    //
    //         user.should.not.be.null;
    //         user.username.should.equal(req.username);
    //         user.email.should.equal(req.email);
    //     });
    //
    // });
    //
    // describe('DELETE /user/users', () => {
    //
    //     it('it should delete a user', (done) => {
    //         const req = {
    //             id: createdUserId
    //         };
    //
    //         chai.request(rest.app)
    //             .delete('/user/users')
    //             .set('Authorization', 'Bearer ' + DemoUser.getInstance().jwt)
    //             .send(req)
    //             .end((err, res) => {
    //
    //                 // Make sure the request is success
    //                 res.should.have.status(200);
    //                 res.body.success.should.be.true;
    //
    //                 done();
    //             });
    //     });
    //
    //     it('it should have disabled a user in database', async () => {
    //         const user = await User.findOne({ _id: createdUserId });
    //
    //         user.should.not.be.null;
    //         user.disabled.should.be.true;
    //     });
    //
    // });
});
