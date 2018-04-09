
exports.up = function (knex, Promise) {
  return knex.schema.createTable('projects', table => {
    table.increments('id').primary();
    table.string('name');
    table.integer('client_ID');
    table.string('project_rate');
    table.boolean('bill_by_project');
    table.boolean('bill_by_task');
    table.boolean('bill_by_user');
    table.string('notes');
    table.string('timeStamp');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('projects');
};
