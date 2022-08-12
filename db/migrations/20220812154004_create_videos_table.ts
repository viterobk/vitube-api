export default {
    name: '20220812154004_create_videos_table',
    up: (knex) => {
        return knex.schema.createTable('videos', (table) => {
            table.increments('id');
            table.string('url', 255).notNullable();
            table.string('name', 255).notNullable();
            table.string('tags', 255);
            table.string('description', 255);
        })
    },
    down: (knex) => {
        knex.schema.dropTable('videos');
    },
}
