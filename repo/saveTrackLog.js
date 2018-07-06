var knex = require('./config');

function saveTrackLog(item) {
    return knex('track')
    .insert(
        { projectId: item.projectId, taskId: item.taskId, userId: item.userId, teamId: item.teamId, date: item.date, startTime: item.startTime,endTime: item.endTime, duration: item.timeDuration, description: item.description, additionalCost: item.additionalCost });
}

module.exports = { saveTrackLog };

