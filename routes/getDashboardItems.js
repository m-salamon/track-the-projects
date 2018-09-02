var express = require('express');
var router = express.Router();
var repo = require('../repo');

router.get('/', (req, res) => {
  repo.getDashboardItems.getDashboardItems(req.query)
    .then((dashboardItems) => {
      console.log('RESPONSE ', dashboardItems)
      res.json({ success: true, dashboardItems: dashboardItems });
    }).catch(err => {
      console.error(err)
    })

});

module.exports = router;