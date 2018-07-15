
exports.up = function (knex, Promise) {
  return knex.schema.createTable('projects', table => {
    table.bigIncrements('id').primary();
    table.string('name').notNullable()
    table.string('clientName').notNullable()
    table.bigInteger('clientId').notNullable()
    table.string('projectRate').notNullable()
    table.boolean('billByProject').notNullable()
    table.boolean('billByTask').notNullable()
    table.boolean('billByUser').notNullable()
    table.string('notes').notNullable()
    table.bigInteger('userId').notNullable()
    table.bigInteger('teamId').notNullable()
    table.timestamp('createdAt').default(knex.fn.now())
    table.timestamp('timeStamp').default(knex.fn.now())  
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('projects');
};
