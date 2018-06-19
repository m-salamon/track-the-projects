
exports.up = function (knex, Promise) {
  return knex.schema.createTable('tasks', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('hourly_rate');
    table.string('project_ID');
    table.integer('user_ID');
    table.integer('team_ID');
    table.string('timeStamp');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('tasks');
};
