var express = require('express');
var router = express.Router();
var repo = require('../repo');
var  moment = require('moment');

router.post('/', (req, res) => {
    let saveLog = repo.deleteTrackLog.deleteTrackLog(req.body.logid)
    .then((trackLog) => {
        res.json({ success: true, trackLog: trackLog });
    }).catch(err => {
        console.error(err)
    });
});

module.exports = router;
