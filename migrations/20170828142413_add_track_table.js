exports.up = function (knex, Promise) {
    return knex.schema.createTable('participents', table => {
        table.increments('id').primary();
        table.string('name');
        table.integer('sum');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('participents');
};
