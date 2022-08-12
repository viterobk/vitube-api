export default {
    name: '20220812152502_create_users_table',
    up: (knex) => {
        return knex.schema.createTable('users', (table) => {
            table.increments('id');
            table.string('name', 255).notNullable();
            table.string('email', 255).notNullable();
            table.string('role', 255).notNullable();
        })
    },
    down: (knex) => {
        knex.schema.dropTable('users');
    },
}
