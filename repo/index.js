var projects = require('./projects');
var tasks = require('./tasks');
var clients = require('./clients');
var saveTrackLog = require('./saveTrackLog');
var getTrackLog = require('./getTrackLog');
var editTrackLog = require('./editTrackLog');
var deleteTrackLog = require('./deleteTrackLog');
var updateTrackLog = require('./updateTrackLog');
var manage = require('./manage');
var getDashboardItems = require('./getDashboardItems');

module.exports = {projects, tasks, clients, saveTrackLog, getTrackLog, editTrackLog, deleteTrackLog, updateTrackLog, manage, getDashboardItems};