import getMigrations from './migrations';

export default class {
    getMigrations = async () => {
        return await getMigrations();
    }
    getMigrationName = (migration) => migration.name;
    getMigration = (migration) => migration;
}