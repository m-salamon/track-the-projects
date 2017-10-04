var knex = require('./config');

function saveTrackLog(item) {
    console.log(item.projectId,item.startTime,item.endTime, item)
    return knex('track')
    .insert(
        { project_ID: item.projectId, user_ID: item.userId, team_ID: item.teamId, date: item.date, start_time: item.startTime,end_time: item.endTime, duration: item.timeDuration, description: item.description, additional_cost: item.additionalCost });
}

module.exports = { saveTrackLog };

