
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('email');
    table.string('team_ID');
  });
};

exports.down = function(knex, Promise) {
  return knex.scheme.dropTable('users');
};