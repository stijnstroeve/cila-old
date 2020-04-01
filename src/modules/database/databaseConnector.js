import {MongoClient} from 'mongodb';
import CilaLogger from '../logger/cilaLogger'

export default class DatabaseConnector {
    /**
     * Try to connect to the database
     * @param config The application configuration
     * @returns {Promise<MongoClient>}
     */
    static connect(config) {
        this.config = config;

        const maxTries = this.config.mongodb_connection_tries;
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
        return MongoClient.connect(this.config.mongodb_url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
    }
}