var express = require('express');
var router = express.Router();
var repo = require('../repo');

router.get('/', (req, res) => {
    //console.log(req.headers)
    let trackLog = repo.getTrackLog.getTrackLog(req.headers)
    .then((trackLog) => {
        res.json({ success: true, trackLog: trackLog });
    });
});

module.exports = router;