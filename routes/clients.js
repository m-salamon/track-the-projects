var express = require('express');
var router = express.Router();
var repo = require('../repo');

router.get('/getClientItems', (req, res) => {
    repo.clients.getClientItems()
    .then((response) => {
        res.json({ success: true, clientItems: response });
    }).catch(err => {
        console.error(err)
    })
    
});

module.exports = router;