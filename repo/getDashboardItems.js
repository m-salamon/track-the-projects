var knex = require('./config');

function getDashboardItems(query) {
  return knex('track as tr')
    .select('tr.id', 'tr.duration', 'tr.date', 'p.name AS project', 't.name AS task', 'c.name AS client', 'tr.projectId', 
    'tr.taskId', 'u.firstName', 'tr.startTime', 'tr.endTime', 'tr.duration', 'tr.description', 'p.projectRate', 
    't.hourlyRate as taskRate', 'u.hourlyRate as userRate')
    .modify(queryBuilder => {
      if (query.projectId)
        queryBuilder.where('tr.projectId', query.projectId)
      if (query.taskId)
        queryBuilder.where('tr.taskId', query.taskId)
      if (query.clientId)
        queryBuilder.where('c.id', query.clientId)
      if (query.userId)
        queryBuilder.where('tr.userId', query.userId)
    })
    .whereBetween('tr.date', [query.startDate, query.endDate])
    .leftJoin('projects as p', 'p.id', 'tr.projectId')
    .leftJoin('tasks as t', 't.id', 'tr.taskId')
    .leftJoin('clients as c', 'c.id', 'p.clientId')
    .leftJoin('users as u', 'u.id', 'tr.userId')
    .orderBy('tr.id', 'esc');
}

module.exports = { getDashboardItems };
