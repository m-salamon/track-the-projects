
exports.up = function (knex, Promise) {
  return knex.schema.createTable('clients', table => {
    table.bigIncrements('id').primary();
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('phone').notNullable()
    table.string('address').notNullable()
    table.bigInteger('userId').notNullable()
    table.bigInteger('teamId').notNullable()
    table.timestamp('createdAt').default(knex.fn.now())
    table.timestamp('timeStamp').default(knex.fn.now())  
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('clients');
};
