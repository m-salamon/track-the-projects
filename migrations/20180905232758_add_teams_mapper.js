
exports.up = function (knex, Promise) {
  return knex.schema.createTable('teams_mapper', table => {
    table.bigIncrements('id').primary();
    table.bigInteger('userId').notNullable()
    table.bigInteger('adminId').notNullable()
    table.timestamp('createdAt').default(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')) 
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('teams_mapper');
};
