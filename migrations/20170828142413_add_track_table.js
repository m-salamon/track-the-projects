
exports.up = function(knex, Promise) {
  return knex.scheme.createTable('track', table => {
    table.increments('id').primary();
    table.string('project_ID');
    table.string('task_ID');
    table.string('user_ID');
    table.string('date');
    table.string('start_time');
    table.string('end_time');
    table.string('duration');
    table.string('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.scheme.dropTable('track');
};
