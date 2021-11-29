const express = require('express');
const router = express.Router();
const accCon = require('../controllers/accountController');

/* GET home page. */
router.get('/', accCon.myaccount);

module.exports = router;
