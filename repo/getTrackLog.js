var knex = require('./config');

function getTrackLog() {
    return knex('track as tr')
    .select( 'tr.id', 'tr.duration', 'tr.date', 'p.name AS task', 't.name AS project', 'c.name AS client')
    .leftJoin('projects as p', 'p.id', 'tr.project_ID')
    .leftJoin('tasks as t', 't.id', 'tr.task_ID')
    .leftJoin('clients as c', 'c.id', 'p.client_ID')
    .where('tr.date', '10/17/2017');

        // SELECT tr.id, tr.duration, tr.date, p.name AS task, t.name AS project, c.name AS client  FROM track tr
        // LEFT JOIN projects p ON p.id = 1 
        // LEFT JOIN tasks t ON t.id = 1
        // LEFT JOIN clients c ON c.id = 1
        // WHERE tr.date = '10/15/2017'
}

module.exports = { getTrackLog };
