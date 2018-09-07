var knex = require('./config');

function addItem(item) {
    console.log(item)
    //item.items.updatedAt = knex.fn.now();
    return knex(item.action)
        .insert(item.items)
}

function getItem(item) {
    return knex(item.action).select().orderBy('id', 'desc');
}

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

function editItem(item) {
    if(item.action == 'dashboard'){
        return knex('track')
        .select('*')
        .where('id', item.id);
    }
    return knex(item.action)
        .select('*')
        .where('id', item.id);
}

function deleteItem(item) {
    return knex(item.action)
        .del()
        .where('id', item.id);
}

function updateItem(item) {
    return knex(item.action)
    .update(
        item.item[0]
    )
    .where('id', item.item[0].id);
}


module.exports = { addItem, getItem, editItem, deleteItem, updateItem, getDashboardItems };

