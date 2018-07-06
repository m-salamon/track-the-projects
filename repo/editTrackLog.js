var knex = require('./config');

function editTrackLog(headers) {
    return knex('track as tr')
    .select( 'tr.id', 'tr.projectId ', 'tr.taskId', 'tr.date', 'tr.startTime AS startTime', 'tr.endTime AS endTime', 'tr.duration', 'tr.description','tr.additionalCost AS additionalCost', 'p.id AS projectId' ,'p.name AS project', 't.id AS taskId','t.name AS task', 'c.name AS client')
    .leftJoin('projects as p', 'p.id', 'tr.projectId')
    .leftJoin('tasks as t', 't.id', 'tr.taskId')
    .leftJoin('clients as c', 'c.id', 'p.clientId')
    .where('tr.id', headers.logid);
}

module.exports = { editTrackLog };