
exports.up = function (knex, Promise) {
  return knex.schema.createTable('teams', table => {
    table.bigIncrements('id').primary();
    table.string('name').notNullable()
    table.bigInteger('adminId').notNullable()
    table.bigInteger('isPublic').notNullable()
    table.timestamp('createdAt').default(knex.fn.now())
    table.timestamp('updatedAt').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')) 
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('teams');
};
           