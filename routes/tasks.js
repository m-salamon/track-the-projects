var express = require('express');
var router = express.Router();
var repo = require('../repo');

router.get('/getTaskItems', (req, res) => {
    let taskItems = repo.tasks.getTaskItems()
    .then((taskItems) => {
        res.json({ success: true, taskItems: taskItems });
    }).catch(err => {
        console.error(err)
    })
    
});

module.exports = router;