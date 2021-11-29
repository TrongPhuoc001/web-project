const express = require('express');
const router = express.Router();
const cusCon = require('../controllers/customerController');

/* GET home page. */
router.get('/', cusCon.checkout);
module.exports = router;
