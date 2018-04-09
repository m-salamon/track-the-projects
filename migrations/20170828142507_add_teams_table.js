
exports.up = function (knex, Promise) {
  return knex.schema.createTable('teams', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('admin_ID');
    table.string('timeStamp');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('teams');
};
