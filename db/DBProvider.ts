import knex, { Knex } from "knex";
import config from 'config';
import MirgrationsSource from "./MirgrationsSource";

const {username: user, password, database, host} = config.db;

export default class DBProvider {
    private _knexInstance: Knex;

    constructor() {
        this._knexInstance = knex({
            client: 'pg',
            connection: {
                host,
                port: 5432,
                user,
                password,
                database,
            }
        })
    }

    migrate = () => {
        this._knexInstance.migrate.latest({
            migrationSource: new MirgrationsSource()
        });
    }

    select = (...args) => {
        this._knexInstance.select(...args);
    }

    insert = (...args) => {
        this._knexInstance.insert(args);
    }

    update = (...args) => {
        this._knexInstance.update(args);
    }

    delete = (...args) => {
        this._knexInstance.delete(args);
    }
}