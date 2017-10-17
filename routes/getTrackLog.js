var express = require('express');
var router = express.Router();
var repo = require('../repo');

router.get('/', (req, res) => {
    let trackLog = repo.getTrackLog.getTrackLog()
    .then((trackLog) => {
        res.json({ success: true, trackLog: trackLog });
    });
});

module.exports = router;