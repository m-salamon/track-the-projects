var knex = require('./config');

function getTrackLog(headers) {
    return knex('track as tr')
    .select( 'tr.id', 'tr.duration', 'tr.date', 'p.name AS project', 't.name AS task', 'c.name AS client')
    .leftJoin('projects as p', 'p.id', 'tr.projectId')
    .leftJoin('tasks as t', 't.id', 'tr.taskId')
    .leftJoin('clients as c', 'c.id', 'p.clientId')
    .where('tr.date', headers.logdate)
    .orderBy('tr.id', 'desc');
}

module.exports = { getTrackLog };
