var knex = require('./config');

function updateTrackLog(item) {
    console.log(item)
    return knex('track')
    .update(
        { project_ID: item.projectId, task_ID: item.taskId,  date: item.date, start_time: item.startTime,end_time: item.endTime, duration: item.timeDuration, description: item.description, additional_cost: item.additionalCost }
    )
    .where('id', item.id);
}

module.exports = { updateTrackLog };

