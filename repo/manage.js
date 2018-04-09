var knex = require('./config');

function addClient(items) {
    items.timeStamp = knex.fn.now();
    return knex('clients')
        .insert(items)
}

function getClient(items) {
    return knex('clients').select().orderBy('id', 'desc');;
}

function editClient(headers) {
    return knex('clients as c')
        .select('*')
        .where('id', headers.id);
}

function deleteClient(items) {
    return knex('clients')
        .del()
        .where('id', items.id);
}

function updateItem(items) {
    return knex('clients')
        .del()
        .where('id', items.id);
}

function updateItem(item) {
    console.log('ITEM ',item)
    return knex('clients')
    .update(
        item[0]
    )
    .where('id', item[0].id);
}


module.exports = { addClient, getClient, editClient, updateItem };

