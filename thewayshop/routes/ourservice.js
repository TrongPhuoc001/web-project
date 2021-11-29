const express = require('express');
const router = express.Router();
const shopCon = require('../controllers/shopController');


/* GET home page. */
router.get('/', shopCon.ourservice);

module.exports = router;
