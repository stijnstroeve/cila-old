import AbstractModule from '../Core/Modules/AbstractModule';
import DatabaseConnector from './DatabaseConnector';

class DatabaseModule extends AbstractModule {

    public name: string = 'DatabaseModule';
    public registerOnTest: boolean = false;

    public register() {
        // Connect to the database
        const database = new DatabaseConnector();
        database.connect();
    }

}

export default DatabaseModule;