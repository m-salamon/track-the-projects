
exports.up = function (knex, Promise) {
  return knex.schema.createTable('projects', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('project_rate');
    table.string('notes');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('projects');
};
