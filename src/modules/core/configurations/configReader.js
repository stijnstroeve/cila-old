import config from '../../../config/config.json';

export default class ConfigReader {
    static read() {
        return config;
    }
}