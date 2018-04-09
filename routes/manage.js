var express = require('express');
var router = express.Router();
var repo = require('../repo');

router.post('/addClient', (req, res) => {
    let items = repo.manage.addClient(req.body)
    .then((items) => {
        res.json({ success: true, items: items });
    });
    
});

router.get('/getClient', (req, res) => {
    let client = repo.manage.getClient()
    .then((client) => {
        res.json({ success: true, client: client });
    });
    
});

router.post('/deleteClient', (req, res) => {
    console.log('in delete hey!')
    let client = repo.manage.deleteClient(req.body)
    .then((client) => {
        res.json({ success: true, client: client });
    });
    
});

router.get('/editClient', (req, res) => {
    let item = repo.manage.editClient(req.headers)
    .then((item) => {
        res.json({success: true, item: item});
    });
    
});

router.post('/updateItem', (req, res) => {
    let item = repo.manage.updateItem(req.body)
    .then((item) => {
        res.json({success: true, item: item});
    });
    
});

module.exports = router;
