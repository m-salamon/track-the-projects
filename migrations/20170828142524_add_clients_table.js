
exports.up = function (knex, Promise) {
  return knex.schema.createTable('clients', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('email');
    table.string('phone');
    table.string('address');
    table.integer('user_ID');
    table.integer('team_ID');
    table.string('timeStamp');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('clients');
};
