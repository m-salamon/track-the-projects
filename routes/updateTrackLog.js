var express = require('express');
var router = express.Router();
var repo = require('../repo');

router.post('/', (req, res) => {
    console.log('body',req.body)
    let updateLog = repo.updateTrackLog.updateTrackLog(req.body)
    .then((updateLog) => {
        res.json({ success: true, updateLog: updateLog });
    });
    
});

module.exports = router;

