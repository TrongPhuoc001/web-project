const express = require('express');
const router = express.Router();
const shopCon = require('../controllers/shopController');


/* GET home page. */
router.get('/', shopCon.contactus);

module.exports = router;
