
exports.up = function (knex, Promise) {
  return knex.schema.createTable('projects', table => {
    table.increments('id').primary();
    table.string('projectName').notNullable()
    table.integer('clientId').notNullable()
    table.string('clientName').notNullable()
    table.string('projectRate').notNullable()
    table.boolean('billByProject').notNullable()
    table.boolean('billByTask').notNullable()
    table.boolean('billByUser').notNullable()
    table.string('notes').notNullable()
    table.integer('userId').notNullable()
    table.integer('teamId').notNullable()
    table.timestamp('createdAt').default(knex.fn.now())
    table.timestamp('timeStamp').default(knex.fn.now())  
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('projects');
};
