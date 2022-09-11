exports.up = (pgm) => {
    const { PgLiteral } = require('node-pg-migrate');
    pgm.createTable('auth', {
        id: {
            type: 'uuid',
            primaryKey: true,
            default: new PgLiteral('uuid_generate_v4()'),
        },
        login: {
            type: 'varchar(128)',
            notNull: true,
        },
        passwordHash: {
            type: 'varchar(256)',
            notNull: true,
        },
        isAdmin: {
            type: 'boolean',
            notNull: true,
            default: true,
        },
        refreshToken: 'varchar(128)',
        refreshTokenExp: 'timestamp',
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updatedAt: 'timestamp',
        deletedAt: 'timestamp',
    });
    pgm.createIndex('auth', 'login');
}
exports.down = (pgm) => {
    pgm.dropIndex('auth', 'login');
    pgm.dropTable('auth');
}
