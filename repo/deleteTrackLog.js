var knex = require('./config');

function deleteTrackLog(logid) {
    return knex('track')
    .del()
    .where('id', logid);
}

module.exports = { deleteTrackLog };