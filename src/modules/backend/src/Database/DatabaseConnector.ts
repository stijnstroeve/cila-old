import mongoose, {Mongoose} from 'mongoose';
import CilaLogger from '../Logging/CilaLogger'
import Configuration from '../Core/Configuration';

class DatabaseConnector {

    /**
     * Try to connect to the database
     * @returns {Promise<Mongoose>}
     */
    public connect(): Promise<Mongoose> {
        const maxTries = Configuration.getInstance().values.mongodb_connection_tries;
        let tries = 0;

        CilaLogger.log('Connecting to database');
        return new Promise((resolve: any, reject: any) => {
            const connect = () => DatabaseConnector.tryConnection().then((client: Mongoose) => {
                CilaLogger.log('Connected to database');

                resolve(client);
            }).catch(() => {
                if(++tries >= maxTries) {
                    CilaLogger.log(`Could not connect!`);
                    reject();
                    process.exit(1);
                } else {
                    CilaLogger.log(`Could not connect to database (${tries}/${maxTries}), retrying...`);
                    connect();
                }
            });
            // Try to connect to the mongodb database
            connect();
        });
    }

    private static tryConnection(): Promise<Mongoose> {
        return mongoose.connect(Configuration.getInstance().values.mongodb_url, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
    }
}

export default DatabaseConnector;