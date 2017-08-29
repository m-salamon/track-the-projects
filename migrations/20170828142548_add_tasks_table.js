
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tasks', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('hourly_rate');
    table.string('project_ID');
  });
};

exports.down = function(knex, Promise) {
  return knex.scheme.dropTable('tasks');
};