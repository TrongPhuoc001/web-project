const express = require('express');
const router = express.Router();
const accCon = require('./controller');

/* GET home page. */
router.get('/', accCon.myaccount);
router.get('/cart', accCon.myaccount);
router.get('/wishlist', accCon.myaccount);
router.get('/checkout', accCon.myaccount);
module.exports = router;
