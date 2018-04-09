
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id').primary();
    table.string('firstName');
    table.string('lastName');
    table.string('email');
    table.boolean('isVerified');
    table.string('password');
    table.string('team_ID');
    table.string('timeStamp');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users');
};
