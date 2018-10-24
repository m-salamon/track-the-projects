var express = require('express');
var router = express.Router();
var repo = require('../repo');

router.post('/addItem', async (req, res) => {
    try {
        let addItem = await repo.manage.addItem(req.body)
        res.json({ success: true, addItem });
    } catch (err) {
        console.error(err)
    }
});

router.get('/getItem', async (req, res) => {
    try {
        let getItems = await repo.manage.getItem(req.headers)
        res.json({ success: true, getItems });
    } catch (err) {
        console.error(err)
    }

});

router.post('/getDashboardItems', async (req, res) => {
    try {
        let getItems = await repo.manage.getDashboardItems(req.body)
        res.json({ success: true, getItems });
    } catch (err) {
        console.error(err)
    }

});

router.post('/deleteItem', async (req, res) => {
    try {
        let deleteItem = await repo.manage.deleteItem(req.body)
        res.json({ success: true, deleteItem });
    } catch (err) {
        console.error(err)
    }
});

router.get('/editItem', async (req, res) => {
    try {
        let editItem = await repo.manage.editItem(req.headers)
        res.json({ success: true, editItem });
    } catch (err) {
        console.error(err)
    }
});

router.post('/updateItem', async (req, res) => {
    try {
        let updateItem = await repo.manage.updateItem(req.body)
        res.json({ success: true, updateItem });
    } catch (err) {
        console.error(err)
    }
});

module.exports = router;
