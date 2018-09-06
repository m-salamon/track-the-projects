var knex = require('knex');

module.exports =  knex({
    client: 'mysql',
    connection: {
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    },
    debug: !true
})