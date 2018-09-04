exports.up = function (knex, Promise) {
    return knex.schema.createTable('track', table => {
        table.bigIncrements('id').primary();
        table.bigInteger('projectId').notNullable()
        table.bigInteger('taskId').notNullable()
        table.string('date').notNullable()
        table.string('startTime').notNullable()
        table.string('endTime').notNullable()
        table.string('duration').notNullable()
        table.string('description').notNullable()
        table.string('additionalCost').notNullable()
        table.bigInteger('userId').notNullable()
        table.bigInteger('teamId').notNullable()
        table.timestamp('createdAt').defaultTo(knex.fn.now())
        table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))   
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('track');
};
