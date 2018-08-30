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
        table.timestamp('createdAt').default(knex.fn.now())
        table.timestamp('timeStamp').default(knex.fn.now())  
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('track');
};
