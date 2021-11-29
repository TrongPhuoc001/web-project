const express = require('express');
const router = express.Router();
const cusCon = require('../controllers/customerController')

/* GET home page. */
router.get('/', cusCon.wishlist);

module.exports = router;
