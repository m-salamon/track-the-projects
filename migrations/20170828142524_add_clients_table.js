
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
    table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('clients');
};
