import mongoose from 'mongoose';
import CilaLogger from '../logger/cilaLogger'
import config from '../core/configurations/config';

export default class DatabaseConnector {
    /**
     * Try to connect to the database
     * @returns {Promise<>}
     */
    static connect() {
        const maxTries = config.mongodb_connection_tries;
        let tries = 0;

        CilaLogger.log('Connecting to database');
        return new Promise((resolve, reject) => {
            const connect = () => this._tryConnect().then((client) => {
                CilaLogger.log('Connected to database');

                resolve(client);
            }).catch(() => {
                if(++tries >= maxTries) {
                    CilaLogger.log(`Could not connect!`);
                    reject();
                } else {
                    CilaLogger.log(`Could not connect to database (${tries}/${maxTries}), retrying...`);
                    connect();
                }
            });
            // Try to connect to the mongodb database
            connect();
        });
    }

    static _tryConnect() {
        return mongoose.connect(config.mongodb_url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
    }
}