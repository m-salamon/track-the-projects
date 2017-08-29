
exports.up = function(knex, Promise) {
  return knex.schema.createTable('clients', table => {
    table.increments('id').primary();
    table.string('name');
    table.string('email');
    table.string('phone');
    table.string('address');
  });
};

exports.down = function(knex, Promise) {
  return knex.scheme.dropTable('clients');
};
