var express = require('express');
var router = express.Router();
var repo = require('../repo');

router.post('/', (req, res) => {
    console.log('in here', req.body.logid)
    let saveLog = repo.deleteTrackLog.deleteTrackLog(req.body.logid)
    .then((trackLog) => {
        console.log(trackLog)
        res.json({ success: true, trackLog: trackLog });
    });
});

module.exports = router;
