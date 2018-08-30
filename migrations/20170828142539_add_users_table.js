
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
       table.bigIncrements('id').primary();
       table.string('firstName').notNullable()
       table.string('lastName').notNullable()
       table.string('phoneNumber').notNullable()
       table.string('email').unique().notNullable()
       table.string('password').notNullable()
       table.string('tempToken').notNullable()
       table.boolean('isVerified').notNullable()
       table.string('hourlyRate').notNullable()
       table.bigInteger('teamId').notNullable()
       table.string('ip').notNullable()
       table.boolean('blackListed').notNullable()
       table.timestamp('createdAt').default(knex.fn.now())
       table.timestamp('timeStamp').default(knex.fn.now())  
   });
};


exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
