
exports.up = function (knex, Promise) {
  return knex.schema.createTable('tasks', table => {
    table.bigIncrements('id').primary();
    table.string('name').notNullable()
    table.string('hourlyRate').notNullable()
    table.string('projectName').notNullable()
    table.bigInteger('projectId').notNullable()
    table.string('notes').notNullable()
    table.bigInteger('userId').notNullable()
    table.bigInteger('teamId').notNullable()
    table.timestamp('createdAt').default(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))    
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('tasks');
};
