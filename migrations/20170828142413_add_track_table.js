exports.up = function (knex, Promise) {
    return knex.schema.createTable('track', table => {
        table.increments('id').primary();
        table.integer('project_ID');
        table.integer('task_ID');
        table.integer('user_ID');
        table.string('date');
        table.string('start_time');
        table.string('end_time');
        table.string('duration');
        table.string('description');
        table.string('additional_cost');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('track');
};
