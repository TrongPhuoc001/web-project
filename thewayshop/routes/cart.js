const express = require('express');
const router = express.Router();
const customerCon = require('../controllers/customerController');

/* GET home page. */
router.get('/', customerCon.cart);
module.exports = router;
