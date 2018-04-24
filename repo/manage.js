var knex = require('./config');

function addItem(item) {
    item.items.timeStamp = knex.fn.now();
    return knex(item.action)
        .insert(item.items)
}

function getItem(item) {
    return knex(item.action).select().orderBy('id', 'desc');;
}

function editItem(item) {
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


module.exports = { addItem, getItem, editItem, deleteItem, updateItem };

