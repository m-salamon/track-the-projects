var knex = require('./config');

function getProjectItems() {
    return knex('projects').select();
}

module.exports = {getProjectItems};