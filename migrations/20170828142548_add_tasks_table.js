
exports.up = function (knex, Promise) {
  return knex.schema.createTable('tasks', table => {
    table.increments('id').primary();
    table.string('name').notNullable()
    table.string('hourlyRate').notNullable()
    table.string('projectId').notNullable()
    table.string('notes').notNullable()
    table.integer('userId').notNullable()
    table.integer('teamId').notNullable()
    table.timestamp('createdAt').default(knex.fn.now())
    table.timestamp('timeStamp').default(knex.fn.now())     
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('tasks');
};
