var express = require('express');
var router = express.Router();
var repo = require('../repo');

router.get('/getProjectItems', (req, res) => {
    let projectItems = repo.projects.getProjectItems()
    .then((projectItems) => {
        res.json({ success: true, projectItems: projectItems });
    }).catch(err => {
        console.error(err)
    })
    
});

module.exports = router;