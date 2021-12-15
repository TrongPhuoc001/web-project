const express = require('express');
const router = express.Router();
const accCon = require('./controller');

/* GET home page. */
router.get('/', accCon.myaccount);
router.get('/profile',accCon.profile);
router.post('/profile',accCon.editProfile);
router.get('/cart', accCon.cart);
router.get('/wishlist', accCon.wishlist);
router.get('/checkout', accCon.checkout);
module.exports = router;
