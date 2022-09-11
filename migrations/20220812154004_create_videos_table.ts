exports.up = (pgm) => {
    const { PgLiteral } = require('node-pg-migrate');
    pgm.createTable('videos', {
        id: {
            type: 'uuid',
            primaryKey: true,
            default: new PgLiteral('uuid_generate_v4()'),
        },
        url: {
            type: 'varchar(256)',
            notNull: true,
        },
        name: {
            type: 'varchar(256)',
            notNull: true,
        },
        description: {
            type: 'text',
        },
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updatedAt: 'timestamp',
        deletedAt: 'timestamp',
    });
    pgm.createIndex('videos', ['name', 'url']);
}
exports.down = (pgm) => {
    pgm.dropIndex('videos', ['name', 'url']);
    pgm.dropTable('videos');
}
