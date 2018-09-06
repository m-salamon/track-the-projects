var express = require('express');
var router = express.Router();
var repo = require('../repo');

router.get('/', async (req, res) => {
  try {
    let dashboardItems = await repo.getDashboardItems.getDashboardItems(req.query)
    res.json({ success: true, dashboardItems });
  } catch (err) {
    console.error(err)
  }
});

module.exports = router;