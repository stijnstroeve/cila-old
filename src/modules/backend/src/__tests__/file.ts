import chai, {expect} from 'chai';
import chaiHttp from 'chai-http';
import File from '../Database/Models/File';
import DemoUser from './models/DemoUser';
import fs from 'fs';

// Setup Http api
import RestAPI from '../Http/RestAPI';
const rest = new RestAPI('development');

// Setup chai
chai.use(chaiHttp);

// Tests
describe('File', () => {

    describe('POST /file/file-upload for successful upload', () => {

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

    describe('POST /file/file-upload for too big file', () => {

        it('it should not upload the too big image file', (done) => {

            chai.request(rest.app)
                .post('/file/upload-file')
                .attach('files', fs.readFileSync('src/__tests__/data/big_image_file.jpg'), 'big_image_file.jpg')
                .set('Authorization', 'Bearer ' + DemoUser.getInstance().jwt)
                .end((err, res) => {

                    expect(res).to.have.status(400);
                    expect(res.body.success).to.be.false;
                    expect(res.body.error.key).to.equal('FILE_TOO_LARGE');

                    done();
                });
        });

    });

});
