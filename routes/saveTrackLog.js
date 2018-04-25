var express = require('express');
var router = express.Router();
var repo = require('../repo');

router.post('/', (req, res) => {
    let saveLog = repo.saveTrackLog.saveTrackLog(req.body)
    .then((saveLog) => {
        res.json({ success: true, saveLog: saveLog });
    }).catch(err => {
        console.error(err)
    })
    
});

module.exports = router;

