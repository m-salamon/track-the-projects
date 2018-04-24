var express = require('express');
var router = express.Router();
var projects = require('./projects');
var tasks = require('./tasks');
var saveTrackLog = require('./saveTrackLog');
var getTrackLog = require('./getTrackLog');
var editTrackLog = require('./editTrackLog');
var deleteTrackLog = require('./deleteTrackLog');
var updateTrackLog = require('./updateTrackLog');
var manage = require('./manage');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/projects', projects);
router.use('/tasks', tasks);
router.use('/saveTrackLog', saveTrackLog);
router.use('/getTrackLog', getTrackLog);
router.use('/editTrackLog', editTrackLog);
router.use('/deleteTrackLog', deleteTrackLog);
router.use('/updateTrackLog', updateTrackLog);
router.use('/manage', manage);


module.exports = router;
