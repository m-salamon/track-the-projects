var knex = require('./config');

function getTaskItems() {
    return knex('tasks').select();
}

module.exports = { getTaskItems };