
exports.up = function (knex, Promise) {
  return knex.schema.createTable('teams', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('adminId');
    table.timestamp('createdAt').default(knex.fn.now())
    table.timestamp('timeStamp').default(knex.fn.now())  
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('teams');
};
