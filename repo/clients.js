
var knex = require('./config');

function getClientItems() {
    return knex('clients').select();
}

module.exports = { getClientItems };