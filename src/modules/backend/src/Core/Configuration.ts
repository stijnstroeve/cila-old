import fs from 'fs';

interface IConfiguration {
    environment: 'development' | 'test' | 'production';
    tick_delay: number;
    mongodb_url: string;
    mongodb_connection_tries: number;
    rest_api_port: number;
    jwt_secret: string;
    jwt_lifetime_days: number;
    password_iterations: number;
    password_key_length: number;
    log_directory: string;
    max_log_file_size: string;
    max_log_files: number;
    file_upload_path: string;
    max_upload_files: number;
    max_file_size_in_bytes: number;
}

class Configuration {

    public static validConfigurationFields: Array<string> = [
        'environment',              // Environment to start the application in, can be "development, production or test"
        'tick_delay',               // Delay for sending a data tick to the client, higher increases bandwidth
        'mongodb_url',              // MongoDB connection url
        'mongodb_connection_tries', // Amount of tries for connecting to your Mongo database
        'rest_api_port',            // The port the REST API runs on
        'jwt_secret',               // The secret jwt tokens are signed with
        'jwt_lifetime_days',        // The amount of days a jwt token is valid
        'password_iterations',      // Iterations to encrypt password with // TODO Better description
        'password_key_length',      // The password key length //TODO Better description
        'log_directory',            // The directory to store all logs in
        'max_log_file_size',        // The maximum file size of a log file
        'max_log_files',            // The maximum amount of log File, if reached it will start archiving old log File
        'file_upload_path',         // The place all uploaded File should be saved in(always prefixed by /public)
        'max_upload_files',         // The maximum amount of File that can be uploaded at once
        'max_file_size_in_bytes'    // The maximum size of an uploaded file in bytes
    ];

    public values: IConfiguration;

    /**
     * Sets up the configuration for the application
     * @param {string} path
     */
    public setupConfiguration(path: string): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.readFile(path, 'utf8', (err, text) => {
                if(err) throw err;

                this.values = JSON.parse(text);

                // Make sure every configuration field exists
                Configuration.validConfigurationFields.forEach((field: string) => {
                    if(!(this.values as any)[field]) {
                        throw new Error(`Field ${field} does not exist in configuration.`)
                    }
                });

                resolve();
            })
        })
    }

    /**
     * If the current application is in test mode
     * @returns {boolean}
     */
    public isTest(): boolean {
        return this.values.environment === 'test';
    }

    /**
     * Gets an production or development environment
     */
    public getSimpleEnvironment(): 'production' | 'development' {
        let env = this.values.environment;
        if(env === 'test') env = 'development';
        return env;
    }

    // Singleton fields and Methods
    private static instance: Configuration;

    private constructor() { }

    public static getInstance(): Configuration {
        if (!Configuration.instance) {
            Configuration.instance = new Configuration();
        }

        return Configuration.instance;
    }
}

export default Configuration;
export {IConfiguration};