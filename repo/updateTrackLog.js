var knex = require('./config');

function updateTrackLog(item) {
    console.log(item)
    return knex('track')
    .update(
        { projectId: item.projectId, taskId: item.taskId,  date: item.date, startTime: item.startTime,endTime: item.endTime, duration: item.timeDuration, description: item.description, additionalCost: item.additionalCost }
    )
    .where('id', item.id);
}

module.exports = { updateTrackLog };

