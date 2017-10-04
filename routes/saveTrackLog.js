var express = require('express');
var router = express.Router();
var repo = require('../repo');

router.post('/', (req, res) => {
    console.log('save Track Log routes', req.body)
    let saveLog = repo.saveTrackLog.saveTrackLog(req.body)
    .then((saveLog) => {
        res.json({ success: true, saveLog: saveLog });
    });
    
});

module.exports = router;

