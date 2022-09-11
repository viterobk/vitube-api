exports.up = (pgm) => {
    const { PgLiteral } = require('node-pg-migrate');
    pgm.createTable('users', {
        id: {
            type: 'uuid',
            primaryKey: true,
            default: new PgLiteral('uuid_generate_v4()'),
        },
        name: {
            type: 'varchar(128)',
            notNull: true,
        },
        email: {
            type: 'varchar(128)',
            notNull: true,
        },
        birthDate: 'timestamp',
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updatedAt: 'timestamp',
        deletedAt: 'timestamp',
    });
    pgm.createIndex('users', ['name', 'email']);
}
exports.down = (pgm) => {
    pgm.dropIndex('users', ['name', 'email']);
    pgm.dropTable('users');
}
