var express = require('express');
var router = express.Router();
var repo = require('../repo');

router.post('/addItem', (req, res) => {
    let item = repo.manage.addItem(req.body)
        .then((item) => {
            res.json({ success: true, item });
        }).catch(err => {
            console.error(err)
        })

});

router.get('/getItem', (req, res) => {
    let client = repo.manage.getItem(req.headers)
        .then((client) => {
            res.json({ success: true, client });
        }).catch(err => {
            console.error(err)
        })
});

router.post('/deleteItem', (req, res) => {
    let client = repo.manage.deleteItem(req.body)
        .then((client) => {
            res.json({ success: true, client });
        }).catch(err => {
            console.error(err)
        })
});

router.get('/editItem', (req, res) => {
    let item = repo.manage.editItem(req.headers)
        .then((item) => {
            res.json({ success: true, item });
        }).catch(err => {
            console.error(err)
        })
});

router.post('/updateItem', (req, res) => {
    let item = repo.manage.updateItem(req.body)
        .then((item) => {
            res.json({ success: true, item });
        }).catch(err => {
            console.error(err)
        })
});

module.exports = router;
