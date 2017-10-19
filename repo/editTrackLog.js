var knex = require('./config');

function editTrackLog(headers) {
    return knex('track as tr')
    .select( 'tr.id', 'tr.project_ID', 'tr.task_ID', 'tr.date', 'tr.start_time', 'tr.end_time', 'tr.duration', 'tr.description','tr.additional_cost', 'p.id AS projectId' ,'p.name AS project', 't.id AS taskId','t.name AS task', 'c.name AS client')
    .leftJoin('projects as p', 'p.id', 'tr.project_ID')
    .leftJoin('tasks as t', 't.id', 'tr.task_ID')
    .leftJoin('clients as c', 'c.id', 'p.client_ID')
    .where('tr.id', headers.logid);
}

module.exports = { editTrackLog };