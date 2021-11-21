const express = require('express');
const router = express.Router();
const dashboardCon = require('../controller/dashboard/mainController')
/* GET home page. */
router.get('/',dashboardCon.get)

module.exports = router;
