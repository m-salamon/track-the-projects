var express = require('express');
var router = express.Router();
var repo = require('../repo');

router.get('/', (req, res) => {
    let trackLog = repo.editTrackLog.editTrackLog(req.headers)
    .then((trackLog) => {
        res.json({ success: true, trackLog: trackLog });
    }).catch(err => {
        console.error(err)
    });
});

module.exports = router;